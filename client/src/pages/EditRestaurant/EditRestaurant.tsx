import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/components/context/userContext";
import { IRestaurant } from "@/types/restaurantTypes";
import { categories } from "../../../data/categories.json";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import updateRestaurant from "@/pages/EditRestaurant/EditRestaurant";
import { fetchRestaurantById } from "@/services/restaurantService";

const EditRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log(user);

  // סטייטים
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [formData, setFormData] = useState<IRestaurant>({
    name: "",
    description: "",
    cuisine_types: [],
    image: "",
    background_image: "",
    min_order: "",
    delivery_fee: "",
    delivery_time: "",
    phone: "",
    is_kosher: false,
    location: {
      type: "Point",
      coordinates: [0, 0],
      address: "",
    },
    weekly_hours: [{ day: "", time_ranges: "" }],
  });

  // Fetch restaurant data when the component mounts
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const fetchedRestaurant = await fetchRestaurantById(
          "6776fdb5d1030347fd0fabd7"
        );
        setRestaurant(fetchedRestaurant);
        console.log(fetchedRestaurant);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    getRestaurant();
  }, []);

  // Update formData once restaurant is fetched
  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        description: restaurant.description || "",
        cuisine_types: restaurant.cuisine_types || [],
        image: restaurant.image || "",
        background_image: restaurant.background_image || "",
        min_order: restaurant.min_order || "",
        delivery_fee: restaurant.delivery_fee || "",
        delivery_time: restaurant.delivery_time || "",
        phone: restaurant.phone || "",
        is_kosher: restaurant.is_kosher ?? false,
        location: restaurant.location || {
          type: "Point",
          coordinates: [0, 0],
          address: "",
        },
        // כאן אתה מוסיף את השעות הקיימות
        weekly_hours: restaurant.weekly_hours.map((entry) => ({
          day: entry.day,
          time_ranges: entry.time_ranges.split(", "), // המרת הערכים לפורמט נכון
        })),
      });
    }
  }, [restaurant]);

  const closeModal = () => {
    navigate(-1);
  };

  console.log(formData);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCheckboxChange = (category: string) => {
    setFormData((prev) => {
      const isSelected = prev.cuisine_types.includes(category);
      const updatedCuisineTypes = isSelected
        ? prev.cuisine_types.filter((type) => type !== category)
        : [...prev.cuisine_types, category];

      return {
        ...prev,
        cuisine_types: updatedCuisineTypes,
      };
    });
  };

  const handleWeeklyHoursChange = (
    day: string,
    type: string,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedWeeklyHours = prev.weekly_hours?.map((entry) => {
        if (entry.day === day) {
          const timeRanges = Array.isArray(entry.time_ranges)
            ? entry.time_ranges
            : entry.time_ranges
            ? entry.time_ranges.split(", ")
            : [];

          const updatedTimeRanges = timeRanges.map((timeRange) => {
            let [hour, minute] = timeRange.split(" - ");

            if (type === "open" && value.length <= 2) {
              hour = `${value.padStart(2, "0")}`;
            }
            if (type === "close" && value.length <= 2) {
              minute = `${value.padStart(2, "0")}`;
            }

            return `${hour} - ${minute}`;
          });

          return { ...entry, time_ranges: updatedTimeRanges.join(", ") };
        }
        return entry;
      });

      return { ...prev, weekly_hours: updatedWeeklyHours };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    if (!restaurant || !restaurant._id) {
      console.log("No restaurant ID found. Cannot submit form.");
      return;
    }

    const validRestaurant = restaurant!;

    updateRestaurant(validRestaurant._id, formData)
      .then(() => {
        console.log("Restaurant updated successfully");
        navigate("/");
      })
      .catch((err) => console.error("Error updating restaurant:", err));
  };
  return (
    <div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeModal}
      >
        <div
          className="w-[70%] h-[85%] sm:max-w-[700px] overflow-auto dialog-slide w-full p-10 text-3xl text-center text-white bg-orangePrimary relative rounded-md"
          style={{
            direction: "ltr",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={closeModal}
            className="absolute rounded-sm cursor-pointer left-4 top-4 opacity-70 hover:opacity-100 focus:outline-none"
          >
            ✖
          </div>
          <div className="w-full p-2 text-3xl text-center text-white ">
            עריכת מסעדה
          </div>{" "}
          <div className="flex flex-col gap-4 ">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-black"
              style={{ direction: "rtl" }}
            >
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="שם המסעדה"
                required
              />
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="תיאור המסעדה"
              />

              <div className="relative width-[80%]">
                <div
                  onClick={toggleDropdown}
                  className="px-4 py-2 text-base bg-white rounded-md cursor-pointer hover:bg-slate-200"
                >
                  בחר קטגוריות
                </div>

                {dropdownOpen && (
                  <div className="absolute z-10 w-56 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul className="p-2 overflow-y-auto max-h-48">
                      {categories.map((category) => (
                        <li
                          key={category.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            checked={formData.cuisine_types.includes(
                              category.name
                            )}
                            onChange={() => handleCheckboxChange(category.name)}
                            className="form-checkbox"
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm"
                          >
                            {category.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <div className="px-4 py-2 text-lg bg-white rounded-md cursor-pointer hover:bg-slate-200">
                    שעות פעילות
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="w-full max-w-sm mx-auto ">
                    <DrawerHeader>
                      <DrawerTitle>
                        <h1 className="text-center">שעות פעילות</h1>
                      </DrawerTitle>
                      <DrawerDescription>
                        <h2 className="text-center">
                          הגדר שעות פתיחה וסגירה לכל יום בשבוע
                        </h2>
                      </DrawerDescription>
                    </DrawerHeader>
                    <form className="p-4 pb-0 space-y-4 text-right">
                      <ul className="space-y-3">
                        {[
                          "ראשון",
                          "שני",
                          "שלישי",
                          "רביעי",
                          "חמישי",
                          "שישי",
                          "שבת",
                        ].map((day) => (
                          <li key={day} className="flex flex-col space-y-2">
                            <span className="font-medium">{day}</span>
                            <div className="flex space-x-2">
                              {/* שדה פתיחה */}
                              <input
                                type="time"
                                value={
                                  formData.weekly_hours
                                    ?.find((entry) => entry.day === day)
                                    ?.time_ranges[0]?.split(" - ")[0] || ""
                                }
                                onChange={(e) =>
                                  handleWeeklyHoursChange(
                                    day,
                                    "open",
                                    e.target.value.replace(":", "")
                                  )
                                }
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="שעת פתיחה"
                              />
                              {/* שדה סגירה */}
                              <input
                                type="time"
                                value={
                                  formData.weekly_hours
                                    ?.find((entry) => entry.day === day)
                                    ?.time_ranges[0]?.split(" - ")[1] || ""
                                }
                                onChange={(e) =>
                                  handleWeeklyHoursChange(
                                    day,
                                    "close",
                                    e.target.value.replace(":", "")
                                  )
                                }
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="שעת סגירה"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>{" "}
                    </form>
                    <DrawerFooter className="mt-4">
                      <Button type="submit">שמור</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">סגור</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
              <Input
                type="text"
                name="address"
                value={formData?.location?.address}
                onChange={handleChange}
                placeholder="כתובת"
                required
              />

              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="טלפון"
                required
              />

              <Input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="כתובת תמונה"
              />
              <Input
                type="text"
                name="background_image"
                value={formData.background_image}
                onChange={handleChange}
                placeholder="כתובת תמונת רקע"
              />
              <Input
                type="number"
                name="min_order"
                value={formData.min_order}
                onChange={handleChange}
                placeholder="מינימום להזמנה"
              />
              <Input
                type="number"
                name="delivery_fee"
                value={formData.delivery_fee}
                onChange={handleChange}
                placeholder="עלות משלוח"
              />
              <Input
                type="text"
                name="delivery_time"
                value={formData.delivery_time}
                onChange={handleChange}
                placeholder="זמן משלוח (דקות)"
              />
              <div className="flex flex-col space-y-2">
                <select
                  name="is_kosher"
                  id="is_kosher"
                  value={formData.is_kosher ? "kosher" : "non-kosher"}
                  onChange={(e) => {
                    const value = e.target.value === "kosher";
                    setFormData((prev) => ({
                      ...prev,
                      is_kosher: value,
                    }));
                  }}
                  className="text-base"
                >
                  <option value="kosher">כשר</option>
                  <option value="non-kosher">לא כשר</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                המשך
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRestaurant;
