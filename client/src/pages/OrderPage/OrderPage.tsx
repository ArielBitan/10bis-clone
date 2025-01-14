import Navbar from "@/components/layout/Navbar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  ShoppingCart,
  Briefcase,
  DollarSign,
  Phone,
  User,
} from "lucide-react";
import { TableDemo } from "./ItemTable";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderById } from "@/services/orderService";
import Loading from "@/components/Loading";

const OrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(orderId as string),
    enabled: !!orderId,
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error loading</div>;
  if (!order) return <div>No data available</div>;

  const dateObj = new Date(order.createdAt);
  sessionStorage.removeItem(`cartDetails_${order.restaurant_id}`);

  // Define status-specific styles or messages
  const statusDetails: Record<string, { color: string; message: string }> = {
    "Awaiting Payment": { color: "text-red-500", message: "ממתין לתשלום" },
    Pending: { color: "text-orange-500", message: "ממתין לאישור" },
    Open: { color: "text-blue-500", message: "פתוח" },
    Accepted: { color: "text-green-500", message: "התקבל" },
    "Picked Up": { color: "text-purple-500", message: "נאסף" },
    Delivered: { color: "text-green-700", message: "נמסר" },
  };

  const statusInfo = statusDetails[order.status] || {
    color: "text-gray-500",
    message: "סטטוס לא ידוע",
  };

  return (
    <div>
      <Navbar />
      <div className="mt-10 mr-10">
        <Link to={`/restaurant/${order.restaurant_id._id}`}>
          <h1 className="text-3xl font-bold">
            {order.restaurant_id.name} | {order.userAddress || ""}
          </h1>
        </Link>
        <div>
          <p className="text-textBlackSecondary">
            {"מספר ההזמנה: " + order._id}
          </p>
          <p className="text-textBlackSecondary">
            {"טלפון לבירורים: " + order.restaurant_id.phone}
          </p>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center h-5 space-x-3 text-sm">
          <div className="ml-2">{dateObj.toTimeString().slice(0, 5)}</div>
          <Separator orientation="vertical" />
          <div>{dateObj.toISOString().split("T")[0]}</div>
        </div>
        <div className="flex flex-col gap-4 mt-10 text-xl">
          <div className="flex flex-col gap-10 lg:gap-40 lg:flex-row">
            <div>
              <div className="flex ">
                <MapPin size={24} />
                <p className="text-xl text-textBlackSecondary">
                  {"נשלח אל: " + order.userAddress || " "}
                </p>
              </div>
              <div className="flex gap-2">
                <Briefcase size={24} />
                <div className={`${statusInfo.color}`}>
                  סטטוס: {statusInfo.message}
                </div>
              </div>
              <div className="flex gap-2">
                <DollarSign size={24} />
                <p>סה"כ בשקלים: {order.total_amount}₪</p>
              </div>
            </div>
            <div className="ml-[40%]">
              פרטי המשתמש:
              <div className="flex gap-2">
                <User size={24} />
                <div>שם: {order.user_id.full_name} </div>
              </div>
              <div className="flex gap-2">
                <Phone size={24} />
                <p>טלפון: {order.user_id.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-10">
            <ShoppingCart size={24} />
            <p>ההזמנה האישית שלך</p>
          </div>
          <TableDemo items={order.order_items} />
          <Card className="w-[90%] my-10 mb-20">
            <CardHeader>
              <CardTitle>בקשות מיוחדות</CardTitle>
              <CardDescription>
                {order.special_instructions.map((ins, index) => (
                  <span key={index}>{ins + ", "}</span>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default OrderPage;
