import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import UserLogin from "./roles/UserLogin";
import UserRegister from "./roles/UserRegister";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

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
        ) : (
          <Button className="w-[100%] max-w-[700px] text-3xl my-10 p-7 md:text-3xl lg:text-4xl">
            {role === "signup" ? "להרשמה" : "התחברות"}
          </Button>
        )}
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[500px] dialog-slide w-full py-3 text-3xl text-center text-black shadow-md">
        <div className="flex justify-around px-10">
          <Button
            onClick={() => setRole("login")}
            className={`relative  text-black text-xl bg-white hover:bg-white ${
              role === "login"
                ? "font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white"
                : "text-black-500"
            }`}
          >
            כבר יש לי חשבון
          </Button>
          <Button
            onClick={() => setRole("signup")}
            className={`relative  text-black text-xl bg-white hover:bg-white ${
              role === "signup"
                ? "font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white"
                : "text-black-500"
            }`}
          >
            זו ההזמנה הראשונה שלי
          </Button>
        </div>
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
