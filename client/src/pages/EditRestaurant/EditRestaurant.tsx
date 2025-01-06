import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface Location {
  city: string;
  address: string;
}

interface WeeklyHours {
  day: string;
  time_ranges: string;
}

interface UserFormData {
  name: string;
  description?: string;
  cuisine_types: string[];
  image?: string;
  background_image?: string;
  location: Location;
  min_order?: string;
  delivery_fee?: string;
  delivery_time?: string;
  phone: string;
  is_kosher: boolean;
  weekly_hours: WeeklyHours[];
}

const EditRestaurant: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    description: "",
    cuisine_types: [],
    image: "",
    background_image: "",
    location: { city: "", address: "" },
    min_order: "",
    delivery_fee: "",
    delivery_time: "",
    phone: "",
    is_kosher: false,
    weekly_hours: [{ day: "", time_ranges: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleWeeklyHoursChange = (index: number, field: string, value: string) => {
    const updatedHours = [...formData.weekly_hours];
    updatedHours[index][field as keyof WeeklyHours] = value;
    setFormData((prev) => ({ ...prev, weekly_hours: updatedHours }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add save logic here
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Edit Restaurant</h1>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData.is_kosher}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, is_kosher: Boolean(checked) }))
              }
            />
            <label>Is Kosher</label>
          </div>
          {/* Weekly Hours */}
          {formData.weekly_hours.map((hour, index) => (
            <div key={index} className="space-y-2">
              <Input
                type="text"
                value={hour.day}
                onChange={(e) => handleWeeklyHoursChange(index, "day", e.target.value)}
                placeholder="Day"
                required
              />
              <Input
                type="text"
                value={hour.time_ranges}
                onChange={(e) => handleWeeklyHoursChange(index, "time_ranges", e.target.value)}
                placeholder="Time Ranges"
                required
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurant;
