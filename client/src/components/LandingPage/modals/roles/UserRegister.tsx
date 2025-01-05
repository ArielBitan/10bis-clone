import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { registerUser } from "@/services/userService";
import BusinessRegister from "./ResturantOwner";
import { AxiosError } from "axios";

interface UserRegisterProps {
  toggleRole: () => void;
}

const UserRegister = ({ toggleRole }: UserRegisterProps) => {
  const [formType, setFormType] = useState<"user" | "business">("user");
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sucsessMessage, setSucsessMessage] = useState<string | null>(null);
  const [userFields, setUserFields] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });

  const clearFields = () => {
    setUserFields({
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
    });
    setErrors({
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
    });
  };

  const handleUserSubmit = async () => {
    const newErrors = {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
    };

    if (!userFields.email) newErrors.email = "אימייל נדרש";
    if (!userFields.first_name) newErrors.first_name = "שם פרטי נדרש";
    if (!userFields.last_name) newErrors.last_name = "שם משפחה נדרש";
    if (!userFields.phone) newErrors.phone = "טלפון נדרש";
    if (!userFields.password) newErrors.password = "סיסמה נדרשת";

    setErrors(newErrors);

    if (
      newErrors.email ||
      newErrors.first_name ||
      newErrors.last_name ||
      newErrors.phone ||
      newErrors.password
    )
      return;

    try {
      await registerUser(userFields);
      clearFields();
      setSucsessMessage(null);
      setErrorMessage(null);
      setSucsessMessage("המשתמש נרשם בהצלחה");
      setTimeout(() => {
        toggleRole();
      }, 1500);
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data.message.includes("duplicate key error")
      ) {
        setErrorMessage('כתובת הדוא"ל או מספר הטלפון רשומים במערכת');
      } else {
        setErrorMessage("שגיאה בהרשמה, אנא נסה שוב מאוחר יותר");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
      <div className="w-full p-2 text-3xl text-center text-white">
        {formType === "user" ? "הרשמה למשתמש חדש" : "הרשמה לבעל עסק "}
      </div>

      <div className="grid gap-4 bg-white w-full p-[50px] text-black">
        {formType === "user" ? (
          <>
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
                  <div className="text-xs text-red-500">
                    {errors.first_name}
                  </div>
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
              <div className="text-xs text-red-500">{errorMessage}</div>
              <div className="text-lg text-center text-orangePrimary">
                {sucsessMessage}
              </div>

              <Button
                type="submit"
                className="w-[80%] mx-auto text-xl"
                onClick={handleUserSubmit}
              >
                המשך
              </Button>
            </div>
          </>
        ) : (
          <BusinessRegister toggleRole={toggleRole} />
        )}
      </div>

      <DialogFooter>
        <div className="w-full mx-auto">
          <div className="mt-4 flex items-center justify-center relative w-[80%] mx-auto">
            <div className="flex-grow border-t border-black" />
            <div className="px-2 text-sm text-center text-black">או</div>
            <div className="flex-grow border-t border-black" />
          </div>
          <div className="mt-4 text-sm text-center hover:cursor-pointer">
            <span className="text-textBlackSecondary">משתמש רשום? </span>
            <span className="text-blueButton" onClick={toggleRole}>
              התחבר
            </span>
          </div>
          <div className="mt-4 text-sm text-center hover:cursor-pointer">
            <span
              className="text-blueButton"
              onClick={() =>
                setFormType(formType === "user" ? "business" : "user")
              }
            >
              {formType === "user" ? "הרשם כעסק" : "הרשם כמשתמש"}
            </span>
          </div>
        </div>
      </DialogFooter>
    </div>
  );
};

export default UserRegister;
