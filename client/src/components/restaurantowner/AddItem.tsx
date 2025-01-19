import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IMenuItem } from "@/types/restaurantTypes";
import { createMenuItem } from "@/services/menuItem";
import { Loader } from "lucide-react";

type IMenuItemF = Omit<IMenuItem, "_id">;

interface AddItemProps {
  resId: string;
  onItemAdded: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ resId, onItemAdded }) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IMenuItemF>({
    name: "",
    description: "",
    restaurant_id: resId,
    price: 0,
    image: "",
    category: "",
    available: true,
  });

  const clearForm = () => {
    setFormData({
      name: "",
      description: "",
      restaurant_id: resId,
      price: 0,
      image: "",
      category: "",
      available: true,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    try {
      const newItem = await createMenuItem(formData);
      onItemAdded();
      setSuccessMessage("הפריט נוצר בהצלחה!");
    } catch (error) {
      console.error("Error creating menu item:", error);
      setSuccessMessage("בעיה ביצירת הפריט!");
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md gap-4 p-4 mx-auto rounded-lg "
      dir="rtl"
    >
      <h2 className="text-xl font-bold">הוסף פריט חדש</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium">
          שם המנה
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="שם המנה"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-medium">
          תיאור המנה
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="תיאור המנה"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="font-medium">
          מחיר
        </label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="מחיר"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="font-medium">
          תמונה
        </label>
        <Input
          type="file"
          id="image"
          name="image"
          onChange={(e) => handleFileChange(e, "image")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="font-medium">
          קטגוריה
        </label>
        <Input
          type="text"
          id="category"
          name="category"
          placeholder="קטגוריה"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="available" className="font-medium">
          זמין:
        </label>
        <input
          type="checkbox"
          id="available"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={loading as boolean}
      >
        {loading ? (
          <Loader className="motion-preset-spin motion-duration-2000" />
        ) : (
          <div>הוסף פריט</div>
        )}
      </Button>
      <div className="text-xl text-white">{successMessage}</div>
    </form>
  );
};

export default AddItem;
