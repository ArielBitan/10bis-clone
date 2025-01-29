import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "../context/userContext";
import { IOrder } from "@/types/orderTypes";
import Messages from "./Messages";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ChatProps {
  order: IOrder;
}

const Chat: React.FC<ChatProps> = ({ order }) => {
  const { user } = useUser();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{user?.role ? "שוחח עם הלקוח" : "לצ'אט עם בית העסק"}</Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="border-none sm:max-w-[700px] dialog-slide w-full max-h-[80vh] overflow-y-auto text-3xl text-center ">
        <div className="sticky top-0 z-10 bg-backgroundOrange ">
          <div className="flex items-center justify-end gap-4 p-3 pb-0 text-white ">
            <h1 className="text-base font-bold text-end">
              {order.restaurant_id.name}
            </h1>
            <img
              src={order.restaurant_id.image as string}
              alt="logo"
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
          <h2 className="mr-20 text-base text-right text-textBlackSecondary">
            {user?._id === order?.user_id?._id
              ? " שוחח עם נציג המסעדה"
              : `אתה משוחח עם ${order?.user_id?.full_name || " "}`}
          </h2>
        </div>
        <Messages order={order} />
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
