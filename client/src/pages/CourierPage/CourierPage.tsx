import { useState } from "react";
import UserMenu from "@/components/layout/UserMenu";
import ActiveOrder from "@/components/CourierPage/ActiveOrder";
import AvailableOrders from "@/components/CourierPage/AvailableOrders";

const CourierPage = () => {
  const [status, setStatus] = useState("orders");
  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50">
      <div className="bg-orangePrimary p-4 shadow-sm sticky top-0 z-10 ">
        <div className="flex justify-between items-center ">
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
          <div className="flex items-center gap-2 ">
            <UserMenu />
          </div>
        </div>
      </div>

      {status === "activeOrder" ? <ActiveOrder /> : <AvailableOrders />}
    </div>
  );
};

export default CourierPage;
