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
  const userAddress = localStorage.getItem("userAddress");

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
  return (
    <div>
      <Navbar />
      <div className="mt-10 mr-10">
        <Link to={`/restaurant/${order.restaurant_id._id}`}>
          <h1 className="text-3xl font-bold">
            {order.restaurant_id.name} | {userAddress || ""}
          </h1>
        </Link>{" "}
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
                  {"נשלח אל: " + userAddress || " "}
                </p>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                </svg>
              </div>
              <div className="flex gap-2">
                <Briefcase size={24} />
                <div>סטטוס: {order.status} </div>
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
