import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { TableDemo } from "@/pages/OrderPage/ItemTable";
import { updateOrderStatus } from "@/services/orderService";
import { IOrder } from "@/types/orderTypes";
import { DialogTitle } from "@radix-ui/react-dialog";

interface OrderRestProps {
  order: IOrder;
  refetchOrders: () => void;
}

const OrderRest: React.FC<OrderRestProps> = ({ order, refetchOrders }) => {
  const dateObj = new Date(order.createdAt);

  const handleAcceptOrder = async () => {
    await updateOrderStatus(order._id, "Open");
    refetchOrders();
  };

  const statusTranslations: Record<string, string> = {
    Pending: "ממתין לאישור המסעדה",
    Open: "מחפש שליח באזור...",
    Accepted: "השליח בדרך לאסוף את ההזמנה",
    "Picked Up": "השליח אסף את ההזמנה ובדרך ללקוח",
  };

  return (
    <div className="flex flex-col justify-center p-4 border">
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex gap-10">
          <div>
            מספר הזמנה: <span className="text-bold">{order._id}</span>
          </div>
          <div>שעה: {dateObj.toTimeString().slice(0, 5)}</div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer text-blue-500 underline">
                מוצרים:{" "}
                {order.order_items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </div>
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent className="sm:max-w-[70%]">
              <div className="mt-[50px]">
                <TableDemo items={order.order_items} />
              </div>
            </DialogContent>
          </Dialog>
          <div>מחיר: {order.total_amount}₪</div>
        </div>
        <div className="flex gap-10">
          <div>
            סטטוס: {statusTranslations[order.status] || "סטטוס לא ידוע"}
          </div>{" "}
          {order.status === "Pending" && (
            <Button onClick={handleAcceptOrder}>קבל הזמנה</Button>
          )}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mt-6">בקשות מיוחדות</AccordionTrigger>
          <AccordionContent>
            <div>{order.special_instructions.join(", ")}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default OrderRest;
