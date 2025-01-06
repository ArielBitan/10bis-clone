import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Navigation,
  Package,
  CheckCircle,
  MapPin,
  Phone,
  User,
  AlertCircle,
} from "lucide-react";
import UserMenu from "@/components/layout/UserMenu";
import ActiveOrder from "@/components/CourierPage/ActiveOrder";

const CourierPage = () => {
  const [status, setStatus] = useState("orders");
  const [currentOrder, setCurrentOrder] = useState({
    id: "ORD-123",
    restaurant: "Hummus House",
    restaurantAddress: "123 Dizengoff St, Tel Aviv",
    restaurantPhone: "03-1234567",
    customer: "David Cohen",
    customerAddress: "45 Rothschild Blvd, Tel Aviv",
    customerPhone: "050-1234567",
    items: ["Classic Hummus", "Falafel Plate"],
    status: "pickup",
    estimatedPickup: "10 mins",
    estimatedDelivery: "25 mins",
  });

  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50">
      <div className="bg-orangePrimary p-4 shadow-sm sticky top-0 z-10 ">
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-2 ">
            <UserMenu />
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm ${
                status === "activeOrder"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-blue-500"
              }`}
              onClick={() => setStatus("activeOrder")}
            >
              הזמנה נוכחית
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm ${
                status === "orders"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-blue-500"
              }`}
              onClick={() => setStatus("orders")}
            >
              הזמנות
            </button>
          </div>
        </div>
      </div>

      {/* Current Delivery Section */}
      {status === "activeOrder" && <ActiveOrder />}

      {/* Available for Orders Section */}
      {status === "available" && (
        <div className="p-4 flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <Package className="h-16 w-16 text-gray-400" />
          <h2 className="text-xl font-medium">Available for Deliveries</h2>
          <p className="text-gray-500">
            You'll be notified when new orders are available
          </p>
        </div>
      )}
    </div>
  );
};

export default CourierPage;
