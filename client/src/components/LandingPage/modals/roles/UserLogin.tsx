import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginUser } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/components/context/userContext";

interface UserLoginProps {
  toggleRole: () => void;
  setDialogOpen: (value: boolean) => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ toggleRole, setDialogOpen }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [showPassword, setShowPassword] = useState(true);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const clearFields = () => {
    setFields({
      email: "",
      password: "",
    });
    setErrors({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };
    if (!fields.email) newErrors.email = "אימייל נדרש";
    if (!fields.password) newErrors.password = "סיסמה נדרשת";
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    try {
      const userData = await loginUser(fields.email, fields.password);
      setUser(userData.user);
      console.log(user);
      clearFields();
      setDialogOpen(false);
      if (user?.role === "restaurant_owner" || user?.role === "courier") {
        navigate("/home", { state: { refresh: true } });
      }
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("400")) {
        setErrors({
          email: "",
          password: "אימייל או סיסמה לא נכונים. אנא נסה שוב.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full p-2 text-3xl text-center text-white ">
        כניסה למשתמש רשום
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-white w-[100%] p-[50px] text-black"
      >
        <div className="grid gap-4">
          <div className="w-full max-w-[400px] mx-auto rtl">
            <Input
              id="email"
              placeholder="*כתובת דואר אלקטרוני"
              className="w-full text-right bg-slate-100"
              value={fields.email}
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
            />
            {errors.email && (
              <div className="text-xs text-red-500">{errors.email}</div>
            )}
          </div>
          <div className="relative w-full max-w-[400px] mx-auto rtl">
            <Input
              id="password"
              type={showPassword ? "password" : "text"}
              placeholder="*סיסמה"
              className="w-full pr-12 text-right bg-slate-100"
              value={fields.password}
              onChange={(e) =>
                setFields({ ...fields, password: e.target.value })
              }
            />
            {errors.password && (
              <div className="text-xs text-red-500">{errors.password}</div>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
              style={{ right: "12px" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full mx-auto">
            <Button type="submit" className="w-[80%] mx-auto text-xl ">
              המשך
            </Button>
            <div className="mt-4 flex items-center justify-center relative w-[80%] mx-auto">
              <div className="flex-grow border-t border-black" />
              <div className="px-2 text-sm text-center text-black">או</div>
              <div className="flex-grow border-t border-black" />
            </div>
            <div className="mt-4 text-sm text-center hover:cursor-pointer">
              <span className="text-textBlackSecondary ">
                פעם ראשונה בתן ביס?
              </span>
              <span className="text-blueButton" onClick={toggleRole}>
                הרשמה מהירה
              </span>
            </div>
          </div>
        </DialogFooter>
      </form>
    </div>
  );
};

export default UserLogin;
