import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  createRestaurant,
  deleteRestaurant,
} from "@/services/restaurantService";
import { createRestaurantOwner } from "@/services/userService";
import { AxiosError } from "axios";

interface RestaurantRegisterProps {
  toggleRole: () => void;
}

const RestaurantRegister = ({ toggleRole }: RestaurantRegisterProps) => {
  const [userFields, setUserFields] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });

  const [restaurantFields, setRestaurantFields] = useState({
    restaurantName: "",
    restaurantPhone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    restaurantName: "",
    restaurantPhone: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sucsessMessage, setSucsessMessage] = useState<string | null>(null);

  const clearFields = () => {
    setUserFields({
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
    });
    setRestaurantFields({
      restaurantName: "",
      restaurantPhone: "",
    });
    setErrors({
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
      restaurantName: "",
      restaurantPhone: "",
    });
  };

  const handleSubmit = async () => {
    const newErrors = {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
      restaurantName: "",
      restaurantPhone: "",
    };

    if (!userFields.email) newErrors.email = "אימייל נדרש";
    if (!userFields.first_name) newErrors.first_name = "שם פרטי נדרש";
    if (!userFields.last_name) newErrors.last_name = "שם משפחה נדרש";
    if (!userFields.phone) newErrors.phone = "טלפון נדרש";
    if (!userFields.password) newErrors.password = "סיסמה נדרשת";
    if (!restaurantFields.restaurantName)
      newErrors.restaurantName = "שם מסעדה נדרש";
    if (!restaurantFields.restaurantPhone)
      newErrors.restaurantPhone = "טלפון מסעדה נדרש";
    setErrors(newErrors);

    if (
      newErrors.email ||
      newErrors.first_name ||
      newErrors.last_name ||
      newErrors.phone ||
      newErrors.password ||
      newErrors.restaurantName ||
      newErrors.restaurantPhone
    )
      return;

    try {
      const restaurantFieldss = {
        name: restaurantFields.restaurantName,
        phone: restaurantFields.restaurantPhone,
      };

      const createdRestaurant = await createRestaurant(restaurantFieldss);

      try {
        const userWithRestaurantId = {
          ...userFields,
          restaurantId: createdRestaurant._id,
          role: "restaurant_owner",
        };
        setSucsessMessage(null);

        await createRestaurantOwner(userWithRestaurantId);

        clearFields();
        setSucsessMessage("המשתמש והמסעדה נוצרו בהצלחה");
        setErrorMessage(null);
        setTimeout(() => {
          toggleRole();
        }, 1500);
      } catch (userCreationError) {
        await deleteRestaurant(createdRestaurant._id);
        console.error("שגיאה ביצירת המשתמש, המסעדה נמחקה", userCreationError);
        setErrorMessage("המשתמש קיים במערכת");
        clearFields();
      }
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data.message.includes("duplicate key error")
      ) {
        setErrorMessage('כתובת הדוא"ל כבר רשומה במערכת');
      } else {
        setErrorMessage("שגיאה בהרשמה, אנא נסה שוב מאוחר יותר");
      }
      clearFields();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full text-3xl text-center text-orange-500">
        פרטי המשתמש
      </div>

      <div className="grid w-full gap-4 p-0 text-black bg-white">
        <div className="grid gap-4">
          <div className="w-full max-w-[400px] mx-auto rtl">
            <Input
              id="email"
              placeholder="*כתובת דואר אלקטרוני"
              className="w-full text-right bg-slate-100"
              value={userFields.email}
              onChange={(e) =>
                setUserFields({ ...userFields, email: e.target.value })
              }
            />
            {errors.email && (
              <div className="text-xs text-red-500">{errors.email}</div>
            )}
          </div>

          <div className="w-full max-w-[400px] mx-auto rtl">
            <Input
              id="first_name"
              placeholder="*שם פרטי"
              className="w-full text-right bg-slate-100"
              value={userFields.first_name}
              onChange={(e) =>
                setUserFields({ ...userFields, first_name: e.target.value })
              }
            />
            {errors.first_name && (
              <div className="text-xs text-red-500">{errors.first_name}</div>
            )}
          </div>

          <div className="w-full max-w-[400px] mx-auto rtl">
            <Input
              id="last_name"
              placeholder="*שם משפחה"
              className="w-full text-right bg-slate-100"
              value={userFields.last_name}
              onChange={(e) =>
                setUserFields({ ...userFields, last_name: e.target.value })
              }
            />
            {errors.last_name && (
              <div className="text-xs text-red-500">{errors.last_name}</div>
            )}
          </div>

          <div className="w-full max-w-[400px] mx-auto rtl">
            <Input
              id="phone"
              placeholder="*טלפון סלולארי"
              className="w-full text-right bg-slate-100"
              value={userFields.phone}
              onChange={(e) =>
                setUserFields({ ...userFields, phone: e.target.value })
              }
            />
            {errors.phone && (
              <div className="text-xs text-red-500">{errors.phone}</div>
            )}
          </div>

          <div className="relative w-full max-w-[400px] mx-auto rtl">
            <Input
              id="password"
              type={showPassword ? "password" : "text"}
              placeholder="*סיסמה"
              className="w-full pr-12 text-right bg-slate-100"
              value={userFields.password}
              onChange={(e) =>
                setUserFields({ ...userFields, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <div className="text-xs text-red-500">{errors.password}</div>
            )}
          </div>
        </div>

        <div className="text-3xl text-center text-orange-500">פרטי מסעדה</div>

        <div className="grid gap-4">
          <div className="w-full max-w-[400px] mx-auto rtl">
            <Input
              id="restaurantName"
              placeholder="*שם המסעדה"
              className="w-full text-right bg-slate-100"
              value={restaurantFields.restaurantName}
              onChange={(e) =>
                setRestaurantFields({
                  ...restaurantFields,
                  restaurantName: e.target.value,
                })
              }
            />
            {errors.restaurantName && (
              <div className="text-xs text-red-500">
                {errors.restaurantName}
              </div>
            )}
          </div>

          <div className="w-full max-w-[400px] mx-auto rtl">
            <Input
              id="restaurantPhone"
              placeholder="*טלפון המסעדה"
              className="w-full text-right bg-slate-100"
              value={restaurantFields.restaurantPhone}
              onChange={(e) =>
                setRestaurantFields({
                  ...restaurantFields,
                  restaurantPhone: e.target.value,
                })
              }
            />
            {errors.restaurantPhone && (
              <div className="text-xs text-red-500">
                {errors.restaurantPhone}
              </div>
            )}
          </div>
        </div>
        <div className="text-lg text-center text-orangePrimary">
          {sucsessMessage}
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-[80%] mx-auto text-xl ">
        המשך
      </Button>

      {errorMessage && (
        <div className="mt-2 text-center text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default RestaurantRegister;
