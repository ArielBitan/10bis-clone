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

interface OrderRestProps {
  order: IOrder;
}

const OrderRest: React.FC<OrderRestProps> = ({ order }) => {
  console.log(order);
  
  // const order = {
  //   _id: "677d2d94ecd6cf90a8a6354b",
  //   user_id: {
  //     _id: "677b9a31c7d6a6f6917ed737",
  //     phone: "0523262640",
  //     full_name: "ori arv=b",
  //     location: {
  //       type: "Point",
  //       coordinates: [0, 0],
  //       address: "לולולו 16, רמת גן",
  //       _id: "6776fdb6d1030347fd0fabd8",
  //     },
  //   },
  //   restaurant_id: {
  //     _id: "6776fdb5d1030347fd0fabd7",
  //     name: "שם המסעדה",
  //     phone: "0523080860",
  //     avgRating: {},
  //     location: {
  //       type: "Point",
  //       coordinates: [0, 0],
  //       address: "זאב זבוטינסקי 16, רמת גן",
  //       _id: "6776fdb6d1030347fd0fabd8",
  //     },
  //   },
  //   order_items: [
  //     {
  //       _id: "6776fdb8d1030347fd0fac09",
  //       restaurant_id: "6776fdb5d1030347fd0fabd7",
  //       name: "ישראלית MIX אישית",
  //       description: "פטריות, בצל, זיתים ירוקים",
  //       image:
  //         "https://d25t2285lxl5rf.cloudfront.net/images/dishes/5bfbc97e-6e21-4cbe-9b77-14caa314dfe3.jpg",
  //       price: 39.9,
  //       available: true,
  //       category: "פיצות MIX",
  //       createdAt: "2025-01-02T20:57:28.404Z",
  //       updatedAt: "2025-01-02T20:57:28.404Z",
  //     },
  //     {
  //       _id: "6776fdb8d1030347fd0fac0b",
  //       restaurant_id: "6776fdb5d1030347fd0fabd7",
  //       name: "ווג'י MIX אישית",
  //       description: "פטריות, עגבניות, בצל סגול, שום קונפי וגבינת פרמז'ן",
  //       image:
  //         "https://d25t2285lxl5rf.cloudfront.net/images/dishes/c3b20024-df62-4d31-9173-1f1b210a344c.jpg",
  //       price: 39.9,
  //       available: true,
  //       category: "פיצות MIX",
  //       createdAt: "2025-01-02T20:57:28.519Z",
  //       updatedAt: "2025-01-02T20:57:28.519Z",
  //     },
  //     {
  //       _id: "6776fdb8d1030347fd0fac0d",
  //       restaurant_id: "6776fdb5d1030347fd0fabd7",
  //       name: "גריק MIX אישית",
  //       description:
  //         "קוביות עגבניות, בצל סגול, זיתי קלמטה וגבינה בולגרית. שמנו מעל: אורגנו",
  //       image:
  //         "https://d25t2285lxl5rf.cloudfront.net/images/dishes/2dfa69f3-bcaa-4608-a767-e4d1f3dcc271.jpg",
  //       price: 39.9,
  //       available: true,
  //       category: "פיצות MIX",
  //       createdAt: "2025-01-02T20:57:28.632Z",
  //       updatedAt: "2025-01-02T20:57:28.632Z",
  //     },
  //   ],
  //   status: "Pending",
  //   special_instructions: ["שלום", "היי", "להתראות", "No onions"],
  //   payment_details: {
  //     method: "Credit Card",
  //     amount: 45.99,
  //   },
  //   createdAt: "2025-01-07T13:35:16.558Z",
  //   total_amount: 84.9,
  //   courier_id: {
  //     _id: "677d2debecd6cf90a8a636fe",
  //     name: "deliverik",
  //     phone: "0502146900",
  //   },
  // };
  const dateObj = new Date(order.createdAt);
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
              <div className="cursor-pointer">
                מוצרים: {order.order_items.length}
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70%]">
              <div className="mt-[50px]">
                <TableDemo items={order.order_items} />
              </div>
            </DialogContent>
          </Dialog>
          <div>מחיר: {order.total_amount}₪</div>
        </div>
        <div className="flex gap-10">
          <div>סטטוס: {order.status}</div>
          {order.status === "Pending" ? (
            <Button onClick={() => updateOrderStatus(order._id, "Open")}>
              קבל הזמנה
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>בקשות מיוחדות</AccordionTrigger>
          <AccordionContent>
            <div>{order.special_instructions.join(", ")}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default OrderRest;
