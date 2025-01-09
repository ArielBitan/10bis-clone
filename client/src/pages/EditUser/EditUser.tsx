import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/userType";
import { updateUserProfile } from "@/services/userService";
import { useUser } from "@/components/context/userContext";

type UserForm = Omit<IUser, "password" | "location">;

const EditUser: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const INITIAL_FORM_STATE: UserForm = {
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  };
  const [formData, setFormData] = useState<UserForm>(INITIAL_FORM_STATE);
  console.log(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(formData);
      console.log(response);
      setUser({
        ...user,
        email: response.email,
        phone: response.phone,
        first_name: response.first_name,
        last_name: response.last_name,
        location: user?.location || {},
        role: user?.role || undefined,
      });

      if (!response) {
        throw new Error("Failed to update user");
      }
      navigate("/home");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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
          עריכת פרטי משתמש
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-black"
          dir="rtl"
        >
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="שם פרטי"
            required
          />

          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="שם משפחה"
            required
          />

          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="אימייל"
            required
          />

          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="טלפון"
            required
          />

          <Button type="submit" className="w-full">
            שמור שינויים
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
