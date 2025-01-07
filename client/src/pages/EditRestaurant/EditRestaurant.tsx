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
import {
  fetchRestaurantById,
  updateRestaurant,
} from "@/services/restaurantService";

interface FormDataState extends Omit<IRestaurant, "weekly_hours"> {
  weekly_hours: Array<{
    day: string;
    time_ranges: string[];
  }>;
}

const INITIAL_FORM_STATE: FormDataState = {
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
  weekly_hours: [
    { day: "ראשון", time_ranges: [""] },
    { day: "שני", time_ranges: [""] },
    { day: "שלישי", time_ranges: [""] },
    { day: "רביעי", time_ranges: [""] },
    { day: "חמישי", time_ranges: [""] },
    { day: "שישי", time_ranges: [""] },
    { day: "שבת", time_ranges: [""] },
  ],
};

const EditRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const fetchedRestaurant = await fetchRestaurantById(
          "6776fdb5d1030347fd0fabd7"
        );

        // Transform weekly_hours data
        const transformedHours =
          fetchedRestaurant.weekly_hours?.map((hour) => ({
            day: hour.day,
            time_ranges: hour.time_ranges.split(", "),
          })) || INITIAL_FORM_STATE.weekly_hours;

        setFormData({
          ...fetchedRestaurant,
          weekly_hours: transformedHours,
        });
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRestaurant();
  }, []);

  const handleWeeklyHoursChange = (
    day: string,
    timeType: "open" | "close",
    value: string
  ) => {
    setFormData((prev) => {
      const updatedHours = prev.weekly_hours.map((hour) => {
        if (hour.day === day) {
          const [openTime, closeTime] = hour.time_ranges[0]?.split(" - ") || [
            "",
            "",
          ];
          const newTimeRange =
            timeType === "open"
              ? `${value} - ${closeTime}`
              : `${openTime} - ${value}`;

          return {
            ...hour,
            time_ranges: [newTimeRange],
          };
        }
        return hour;
      });

      return {
        ...prev,
        weekly_hours: updatedHours,
      };
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: e.target.value,
      },
    }));
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

  const handleCuisineChange = (category: string) => {
    setFormData((prev) => {
      const isSelected = prev.cuisine_types.includes(category);
      return {
        ...prev,
        cuisine_types: isSelected
          ? prev.cuisine_types.filter((type) => type !== category)
          : [...prev.cuisine_types, category],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Transform weekly_hours back to the format expected by the API
      const submissionData = {
        ...formData,
        weekly_hours: formData.weekly_hours.map((hour) => ({
          day: hour.day,
          time_ranges: hour.time_ranges.join(", "),
        })),
      };

      const response = await updateRestaurant(
        "6776fdb5d1030347fd0fabd7",
        submissionData
      );

      if (!response) {
        throw new Error("Failed to update restaurant");
      }

      navigate("/");
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-[70%] h-[85%] sm:max-w-[700px] overflow-auto p-10 text-3xl bg-orangePrimary relative rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Close"
        >
          ✖
        </button>

        <h1 className="w-full p-2 text-3xl text-center text-white">
          עריכת מסעדה
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-black"
          dir="rtl"
        >
          <Input
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

          <div className="relative">
            <Button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full justify-start"
            >
              בחר קטגוריות
            </Button>

            {dropdownOpen && (
              <div className="absolute z-10 w-56 mt-2 bg-white border rounded-md shadow-lg">
                <ul className="p-2 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="flex items-center gap-2 p-1"
                    >
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={formData.cuisine_types.includes(category.name)}
                        onChange={() => handleCuisineChange(category.name)}
                        className="form-checkbox"
                      />
                      <label htmlFor={`category-${category.id}`}>
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
              <Button className="w-full">שעות פעילות</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="max-w-sm mx-auto">
                <DrawerHeader>
                  <DrawerTitle>שעות פעילות</DrawerTitle>
                  <DrawerDescription>
                    הגדר שעות פתיחה וסגירה לכל יום בשבוע
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-4">
                  {formData.weekly_hours.map(({ day, time_ranges }) => (
                    <div key={day} className="space-y-2">
                      <label className="font-medium">{day}</label>
                      <div className="flex gap-2">
                        <input
                          type="time"
                          value={time_ranges[0]?.split(" - ")[0] || ""}
                          onChange={(e) =>
                            handleWeeklyHoursChange(day, "open", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border rounded-md"
                        />
                        <input
                          type="time"
                          value={time_ranges[0]?.split(" - ")[1] || ""}
                          onChange={(e) =>
                            handleWeeklyHoursChange(
                              day,
                              "close",
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">סגור</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <Input
            name="address"
            value={formData.location?.address}
            onChange={handleLocationChange}
            placeholder="כתובת"
            required
          />

          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="טלפון"
            required
          />

          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="כתובת תמונה"
          />

          <Input
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
            name="delivery_time"
            value={formData.delivery_time}
            onChange={handleChange}
            placeholder="זמן משלוח (דקות)"
          />

          <select
            name="is_kosher"
            value={formData.is_kosher ? "kosher" : "non-kosher"}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                is_kosher: e.target.value === "kosher",
              }));
            }}
            className="w-full p-2 border rounded-md"
          >
            <option value="kosher">כשר</option>
            <option value="non-kosher">לא כשר</option>
          </select>

          <Button type="submit" className="w-full">
            שמור שינויים
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurant;
