import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, DollarSign, MapPin, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerCourier } from "@/services/userService";
import { useUser } from "@/components/context/userContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourierRegister = () => {
  const { user, fetchUser, logout } = useUser();
  const [log, setLog] = useState<string>("");
  useEffect(() => {
    fetchUser();
  }, []);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLog("");
    if (user?._id)
      try {
        const response = await registerCourier(user?._id);
        if (!response) {
          throw new Error("Failed to update user");
        }
        setLog(
          "ברכות, התקבלת למאגר השליחים של וולט. \n התחבר מחדש והתחל לעבוד"
        );
        setTimeout(() => {
          logout();
          navigate("/");
        }, 5000);
      } catch (error) {
        console.error("Error updating user:", error);
      }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[300px]">
        <img
          src="https://thumbor.takeaway-recruitment-api.k.elnino-production.com/-yT-BMwvE2sxwuh9TUOdMzk6VEU=/320x300/smart/https%3A%2F%2Ftakeaway-recruitment-api.k.elnino-production.com%2Fstorage%2Flanding_page%2FSk5uRRLl02ZSYub5gwzW6jlvHBCXFnpjmGJRij9B.webp"
          alt="description"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>{" "}
      <div className="w-full mt-10 mr-10 text-center">
        <h1 className="text-3xl font-bold">הצטרף למאגר השליחים שלנו</h1>
        <p className="text-textBlackSecondary">שליחי תן ביס</p>
        <Separator className="my-2" />
        <div className="flex items-center justify-center h-5 space-x-3 text-sm">
          <div className="ml-2">הרשמה כאן</div>
          <Separator orientation="vertical" />
          <div>להרשמה מלא את הפרטים הבאים</div>
        </div>
        <div className="flex flex-col gap-4 mt-10 text-xl text-center">
          <div className="flex flex-col gap-10 lg:gap-40 lg:flex-row">
            <div className="flex items-center justify-center">
              <MapPin size={24} />
              <p className="text-xl text-textBlackSecondary">עבוד קרוב לביתך</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Briefcase size={24} />
              <div>עבודה בתנאים שלך</div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <DollarSign size={24} />
              <p>שכר מעולה למתאימים</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <User size={24} />
              ניתן לעבוד אך ורק מעל גיל 18
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone size={24} />
              <p>טלפון לבירורים: 0523080860</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 my-20">
            <div className="bg-[rgba(242,166,176,1)] rounded-xl p-4 w-[60%] flex gap-10 ">
              <img
                alt="checked"
                src="https://takeaway-recruitment-api.k.elnino-production.com/assets/checked-CGge6zgO.svg"
                className="rounded-[100%] p-2 bg-white border-black  w-16 h-16"
              />
              <p>להיות מעל גיל 18 אם טרם מלאו לך 18 נשמח שתגיש מועמדות בהמשך</p>
            </div>
            <div className="bg-[rgba(193,218,222,1)] rounded-xl p-4 w-[60%] flex gap-10 ">
              <img
                alt="checked"
                src="https://takeaway-recruitment-api.k.elnino-production.com/assets/checked-CGge6zgO.svg"
                className="rounded-[100%] p-2 bg-white border-black  w-16 h-16"
              />
              <p>
                רישיון רכב וביטוח חובה בתוקף (במידה וברצונך לעבוד על אופנוע /
                רכב פרטי)
              </p>
            </div>
            <div className="bg-[rgba(239,237,234,1)] rounded-xl p-4 w-[60%] flex gap-10 ">
              <img
                alt="checked"
                src="https://takeaway-recruitment-api.k.elnino-production.com/assets/checked-CGge6zgO.svg"
                className="rounded-[100%] p-2 bg-white border-black  w-16 h-16"
              />
              <p>להיות בעל.ת תושייה עם גישה חיובית ונכונות להתמודד עם בעיות</p>
            </div>
            <div className="bg-[rgba(246,194,67)] rounded-xl p-4 w-[60%] flex gap-10 ">
              <img
                alt="checked"
                src="https://takeaway-recruitment-api.k.elnino-production.com/assets/checked-CGge6zgO.svg"
                className="rounded-[100%] p-2 bg-white border-black  w-16 h-16"
              />
              <p>
                תעודת זהות, ספח פתוח ורישיון נהיגה (במידה וברצונך לעבוד על
                אופניים חשמליים \ אופנוע או רכב פרטי)
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-3xl text-center text-textBlackSecondary">
          טופס הרשמה
        </h1>
        <div className="flex items-center justify-center mb-[100px]">
          <Card className="w-full max-w-[1200px] mx-auto my-12 p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 text-2xl text-black"
              dir="rtl"
            >
              <Input
                name="first_name"
                placeholder="שם פרטי"
                required
                className="w-full p-6 text-3xl placeholder:text-2xl"
              />

              <Input
                name="last_name"
                placeholder="שם משפחה"
                required
                className="w-full p-6 text-3xl placeholder:text-2xl"
              />

              <Input
                name="email"
                type="email"
                placeholder="אימייל"
                required
                className="w-full p-6 text-3xl placeholder:text-2xl"
              />

              <Input
                name="phone"
                placeholder="טלפון"
                required
                className="w-full p-6 text-3xl placeholder:text-2xl"
              />

              <Button
                type="submit"
                className="w-full py-3 text-2xl text-white bg-blue-600 rounded-md"
              >
                שלח
              </Button>
            </form>
            <h1 className="mt-10 text-3xl text-orangePrimary">{log}</h1>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourierRegister;
