import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const UserLogin = ({ toggleRole }: { toggleRole: () => void }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full p-2 text-3xl text-center text-white ">
        כניסה למשתמש רשום
      </div>
      <div className="grid gap-4 bg-white w-[100%] p-[50px] text-black">
        <div className="grid items-center gap-4">
          <Input
            id="email"
            placeholder="*כתובת דואר אלקטרוני"
            className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
          />
        </div>
        <div className="grid items-center gap-4">
          <Input
            id="password"
            placeholder="*סיסמה"
            className="col-span-3 rtl:w-[80%] text-right bg-slate-100"
          />
        </div>
      </div>
      <DialogFooter>
        <div className="w-full mx-auto">
          <Button type="submit" className="w-[80%] mx-auto text-xl ">
            המשך
          </Button>
          <div className="mt-4 flex items-center justify-center relative w-[80%] mx-auto">
            <div className="flex-grow border-t border-black" />{" "}
            <div className="px-2 text-sm text-center text-black">או</div>{" "}
            <div className="flex-grow border-t border-black" />{" "}
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
    </div>
  );
};

export default UserLogin;
