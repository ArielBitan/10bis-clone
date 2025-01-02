import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import UserLogin from "./roles/UserLogin";
import UserRegister from "./roles/UserRegister";

function LogInModal() {
  const [role, setRole] = useState<"login" | "signup">("login");

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "login" ? "signup" : "login"));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-3 flex-column">
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/UserIcon.png"
            alt=""
          />
          <div className="text-xl text-white">משתמש רשום?</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] dialog-slide w-full p-10 text-3xl text-center text-white bg-orangePrimary">
        {role === "login" ? (
          <UserLogin toggleRole={toggleRole} />
        ) : (
          <UserRegister toggleRole={toggleRole}  />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LogInModal;
