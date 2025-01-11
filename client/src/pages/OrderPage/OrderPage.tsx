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
import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/layout/footer";

const OrderPage = () => {
  const order = {
    _id: "677d2d94ecd6cf90a8a6354b",
    user_id: {
      _id: "677b9a31c7d6a6f6917ed737",
      phone: "0523262640",
      full_name: "ori arv=b",
      location: {
        type: "Point",
        coordinates: [0, 0],
        address: "לולולו 16, רמת גן",
        _id: "6776fdb6d1030347fd0fabd8",
      },
    },
    restaurant_id: {
      _id: "6776fdb5d1030347fd0fabd7",
      name: "שם המסעדה",
      phone: "0523080860",
      avgRating: {},
      location: {
        type: "Point",
        coordinates: [0, 0],
        address: "זאב זבוטינסקי 16, רמת גן",
        _id: "6776fdb6d1030347fd0fabd8",
      },
    },
    order_items: [
      {
        _id: "6776fdb8d1030347fd0fac09",
        restaurant_id: "6776fdb5d1030347fd0fabd7",
        name: "ישראלית MIX אישית",
        description: "פטריות, בצל, זיתים ירוקים",
        image:
          "https://d25t2285lxl5rf.cloudfront.net/images/dishes/5bfbc97e-6e21-4cbe-9b77-14caa314dfe3.jpg",
        price: 39.9,
        available: true,
        category: "פיצות MIX",
        createdAt: "2025-01-02T20:57:28.404Z",
        updatedAt: "2025-01-02T20:57:28.404Z",
      },
      {
        _id: "6776fdb8d1030347fd0fac0b",
        restaurant_id: "6776fdb5d1030347fd0fabd7",
        name: "ווג'י MIX אישית",
        description: "פטריות, עגבניות, בצל סגול, שום קונפי וגבינת פרמז'ן",
        image:
          "https://d25t2285lxl5rf.cloudfront.net/images/dishes/c3b20024-df62-4d31-9173-1f1b210a344c.jpg",
        price: 39.9,
        available: true,
        category: "פיצות MIX",
        createdAt: "2025-01-02T20:57:28.519Z",
        updatedAt: "2025-01-02T20:57:28.519Z",
      },
      {
        _id: "6776fdb8d1030347fd0fac0d",
        restaurant_id: "6776fdb5d1030347fd0fabd7",
        name: "גריק MIX אישית",
        description:
          "קוביות עגבניות, בצל סגול, זיתי קלמטה וגבינה בולגרית. שמנו מעל: אורגנו",
        image:
          "https://d25t2285lxl5rf.cloudfront.net/images/dishes/2dfa69f3-bcaa-4608-a767-e4d1f3dcc271.jpg",
        price: 39.9,
        available: true,
        category: "פיצות MIX",
        createdAt: "2025-01-02T20:57:28.632Z",
        updatedAt: "2025-01-02T20:57:28.632Z",
      },
    ],
    status: "Delivered",
    special_instructions: ["שלום", "היי", "להתראות", "No onions"],
    payment_details: {
      method: "Credit Card",
      amount: 45.99,
    },
    createdAt: "2025-01-07T13:35:16.558Z",
    total_amount: 84.9,
    courier_id: {
      _id: "677d2debecd6cf90a8a636fe",
      name: "deliverik",
      phone: "0502146900",
    },
  };
  const dateObj = new Date(order.createdAt);
  return (
    <div>
      <Navbar />
      <div className="mt-10 mr-10">
        <Link to={`/restaurant/${order.restaurant_id._id}`}>
          <h1 className="text-3xl font-bold">
            {order.restaurant_id.name} | {order.restaurant_id.location.address}
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
                  {"נשלח אל: " + order.user_id.location.address}
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
          </Card  >{" "}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default OrderPage;
