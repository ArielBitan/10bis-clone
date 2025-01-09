import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IMenuItem } from "@/types/restaurantTypes";
import { createMenuItem } from "@/services/menuItem";

type IMenuItemF = Omit<IMenuItem, "_id">;

interface AddItemProps {
  resId: string;
  onItemAdded: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ resId, onItemAdded }) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    try {
      const newItem = await createMenuItem(formData);
      console.log("New Menu Item:", newItem);
      onItemAdded();
      setSuccessMessage("הפריט נוצר בהצלחה!");
    } catch (error) {
      console.error("Error creating menu item:", error);
      setSuccessMessage("בעיה ביצירת הפריט!");
    } finally {
      clearForm();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md gap-4 p-4 mx-auto rounded-lg "
      dir="rtl"
    >
      <h2 className="text-xl font-bold">הוסף פריט חדש</h2>
      <Input
        type="text"
        name="name"
        placeholder="שם המנה"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="תיאור המנה"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className="p-2 border rounded-md"
      />
      <Input
        type="number"
        name="price"
        placeholder="מחיר"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="image"
        placeholder="לינק לתמונה"
        value={formData.image}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="category"
        placeholder="קטגוריה"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <div className="flex items-center gap-2">
        <label htmlFor="available">זמין:</label>
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">הוסף פריט</Button>
      <div className="text-xl text-white">{successMessage}</div>
    </form>
  );
};

export default AddItem;
