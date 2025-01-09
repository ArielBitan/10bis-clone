import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IMenuItem } from "@/types/restaurantTypes";
import { updateMenuItem } from "@/services/menuItem";

interface EditItemProps {
  item: IMenuItem;
  renderFunc: () => void;
}

const EditItem: React.FC<EditItemProps> = ({ item, renderFunc }) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [formData, setFormData] = useState<IMenuItem>({
    name: item.name,
    description: item.description,
    restaurant_id: item.restaurant_id,
    price: item.price,
    image: item.image,
    category: item.category,
    available: item.available,
  });
  const clearForm = () => {
    setFormData({
      name: item.name,
      description: item.description,
      restaurant_id: item.restaurant_id,
      price: item.price,
      image: item.image,
      category: item.category,
      available: item.available,
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
    setSuccessMessage("");
    if (item._id)
      try {
        const newItem = await updateMenuItem(item._id, formData);
        console.log("New Menu Item:", newItem);
        setSuccessMessage("העריכה התבצעה!");
        renderFunc();
      } catch (error) {
        console.error("Error creating menu item:", error);
        setSuccessMessage("בעיה בעריכה!");
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
      <h2 className="text-xl font-bold">עריכת פריט</h2>
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
        type="file"
        id="image"
        name="image"
        onChange={(e) => handleFileChange(e, "image")}
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
      <Button type="submit">ערוך פריט</Button>
      <div className="text-xl text-white">{successMessage}</div>
    </form>
  );
};

export default EditItem;
