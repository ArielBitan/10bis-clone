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
import OrderMap from "@/components/OrderPage/OrderMap";
import { useEffect, useState } from "react";
import { useSocket } from "@/components/context/socketContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Define types for order updates
interface OrderUpdate {
  message: string;
  timestamp: string;
  status: "Pending" | "Open" | "Accepted" | "Picked Up" | "Delivered";
}

interface OrderStatus {
  code: string;
  message: string;
}

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { socket, connected, joinRoom, leaveRoom } = useSocket();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(orderId as string),
    enabled: !!orderId,
  });

  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    code: order?.status || "",
    message: "",
  });
  useEffect(() => {
    if (!connected || !orderId || !socket) {
      return;
    }
    const handleOrderUpdate = (data: OrderUpdate) => {
      let statusMessage = "";

      switch (data.status) {
        case "Pending":
          statusMessage = "ההזמנה שלך ממתינה לעיבוד.";
          break;
        case "Open":
          statusMessage = "ההזמנה שלך נפתחה והועברה לטיפול.";
          break;
        case "Accepted":
          statusMessage = "ההזמנה שלך התקבלה ונמצאת בעבודה.";
          break;
        case "Picked Up":
          statusMessage = "השליח לקח את ההזמנה שלך.";
          break;
        case "Delivered":
          statusMessage = "ההזמנה שלך נמסרה בהצלחה.";
          break;
        default:
          statusMessage = "הסטטוס של ההזמנה לא זמין.";
      }
      setOrderStatus({
        code: data.status,
        message: statusMessage,
      });
      toast({ title: "הזמנתך עודכנה", description: statusMessage });
    };
    const subscribeToUpdates = () => {
      if (!isSubscribed) {
        joinRoom(orderId);
        localStorage.setItem("orderRoom", orderId);

        setIsSubscribed(true);
      }
    };

    const unsubscribeFromUpdates = () => {
      if (isSubscribed) {
        leaveRoom(orderId);
        localStorage.removeItem("orderRoom");
        setIsSubscribed(false);
      }
    };

    subscribeToUpdates();
    socket.on("order-update", handleOrderUpdate);

    return () => {
      socket.off("order-update", handleOrderUpdate);
      unsubscribeFromUpdates();
    };
  }, [socket, connected, orderId, isSubscribed]);

  useEffect(() => {
    if (order?.status) {
      setOrderStatus({
        code: order.status,
        message: statusDetails[order.status].message,
      });
    }
  }, [order]);

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

  const statusDetails: Record<string, { color: string; message: string }> = {
    "Awaiting Payment": { color: "text-red-500", message: "ממתין לתשלום" },
    Pending: { color: "text-orange-500", message: "ממתין לאישור" },
    Open: { color: "text-blue-500", message: "פתוח" },
    Accepted: { color: "text-green-500", message: "התקבל" },
    "Picked Up": { color: "text-purple-500", message: "נאסף" },
    Delivered: { color: "text-green-700", message: "נמסר" },
  };

  const statusInfo = statusDetails[orderStatus.code] || {
    color: "text-gray-500",
    message: "סטטוס לא ידוע",
  };

  const restId = order.restaurant_id._id;

  return (
    <div>
      <Navbar />

      <div className="mt-10 mr-10">
        <div className="float-end ml-10 mb-10">
          <OrderMap
            userLocation={order.userAddress}
            restaurantLocation={order.restaurant_id.location?.coordinates}
          />
        </div>
        {/* Existing order header content */}
        <h1 className="text-3xl font-bold">
          {order.restaurant_id.name} | {order.userAddress || ""}
        </h1>

        <div>
          <p className="text-textBlackSecondary">
            {"מספר ההזמנה: " + order._id}
          </p>
          <p className="text-textBlackSecondary">
            {"טלפון לבירורים: " + order.restaurant_id.phone}
          </p>
        </div>

        <div className="flex items-center h-5 space-x-3 text-sm">
          <div className="ml-2">{dateObj.toTimeString().slice(0, 5)}</div>
          <Separator orientation="vertical" />
          <div>{dateObj.toISOString().split("T")[0]}</div>
        </div>
        <Link
          to={`/restaurant/${restId}/review`}
          state={{ backgroundLocation: location.pathname }}
        >
          <Button className="mt-4">הוסף ביקורת</Button>
        </Link>
        <div className="flex flex-col gap-4 mt-10 text-xl">
          <div className="relative flex flex-col gap-10 lg:flex-row">
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
          <div className="flex gap-2 mt-20">
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
        <Footer />
      </div>
    </div>
  );
};
export default OrderPage;
