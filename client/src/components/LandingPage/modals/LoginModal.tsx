import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import UserLogin from "./roles/UserLogin";
import UserRegister from "./roles/UserRegister";
import { Button } from "@/components/ui/button";

interface LogInModalProps {
  rolee: "login" | "signup";
  isHomePage?: boolean;
}

const LogInModal = ({ rolee, isHomePage }: LogInModalProps) => {
  const [role, setRole] = useState<"login" | "signup">(rolee);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "login" ? "signup" : "login"));
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        asChild
        className="hover:cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        {isHomePage ? (
          <div className="text-white">כניסה</div>
        ) : rolee === "signup" ? (
          <Button className="w-[100%] max-w-[700px] text-3xl my-10 p-7 md:text-3xl lg:text-4xl">
            לפרטים נוספים
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/UserIcon.png"
              alt="User Icon"
              className="w-10 h-10"
            />
            <div className="text-xl text-white">משתמש רשום?</div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] dialog-slide w-full p-10 text-3xl text-center text-white bg-orangePrimary">
        {role === "login" ? (
          <UserLogin toggleRole={toggleRole} setDialogOpen={setDialogOpen} />
        ) : (
          <UserRegister toggleRole={toggleRole} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LogInModal;
