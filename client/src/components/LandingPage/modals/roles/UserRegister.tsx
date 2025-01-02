import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface UserRegisterProps {
  toggleRole: () => void;
}

const UserRegister = ({ toggleRole }: UserRegisterProps) => {
  const [formType, setFormType] = useState<"user" | "business">("user");

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
      <div className="w-full p-2 text-3xl text-center text-white">
        {formType === "user" ? "הרשמה למשתמש חדש" : "הרשמה לעסק חדש"}
      </div>

      <div className="grid gap-4 bg-white w-full p-[50px] text-black">
        {/* שדות כלליים */}
        <div className="grid items-center gap-4">
          <Input
            id="email"
            placeholder="*כתובת דואר אלקטרוני"
            className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
          />
        </div>
        <div className="grid items-center gap-4">
          <Input
            id="firstName"
            placeholder="*שם פרטי"
            className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
          />
        </div>
        <div className="grid items-center gap-4">
          <Input
            id="lastName"
            placeholder="*שם משפחה"
            className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
          />
        </div>
        <div className="grid items-center gap-4">
          <Input
            id="phone"
            placeholder="*טלפון סלולארי"
            className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
          />
        </div>

        {/* שדות נוספים לעסק */}
        {formType === "business" && (
          <>
            <div className="w-full p-2 text-2xl text-center text-orangePrimary">
              פרטי מסעדה
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="restaurantName"
                placeholder="*שם מסעדה"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="description"
                placeholder="*פרטים"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="type"
                placeholder="*סוג"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="image"
                placeholder="*תמונה"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="backgroundImage"
                placeholder="*תמונת רקע"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="address"
                placeholder="*כתובת"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="location"
                placeholder="*לוקיישן"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="minOrder"
                placeholder="*מינימום להזמנה"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="deliveryFee"
                placeholder="*דמי משלוח"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="deliveryTime"
                placeholder="*זמן משלוח"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="businessPhone"
                placeholder="*מספר טלפון"
                className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <label htmlFor="updates" className="text-sm text-black">
                שלחו לי מידע אודות עדכונים ומבצעים
              </label>
              <input
                type="checkbox"
                id="updates"
                className="w-4 h-4 text-blue-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <label htmlFor="terms" className="text-sm text-black">
                קראתי, הבנתי ואני מסכים/ה לתנאי שימוש ולמדיניות הפרטיות
              </label>
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-blue-500"
              />
            </div>
          </>
        )}
      </div>

      <DialogFooter>
        <div className="w-full mx-auto">
          <Button type="submit" className="w-[80%] mx-auto text-xl">
            המשך
          </Button>
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
