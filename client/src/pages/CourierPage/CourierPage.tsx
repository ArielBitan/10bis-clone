import UserMenu from "@/components/layout/UserMenu";
import ActiveOrder from "@/components/CourierPage/ActiveOrder";
import AvailableOrders from "@/components/CourierPage/AvailableOrders";
import { useUser } from "@/components/context/userContext";
import { useEffect } from "react";
import { acceptOrder, updateOrderStatus } from "@/services/orderService";

const CourierPage = () => {
  const { user, fetchUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, [acceptOrder, updateOrderStatus]);

  console.log(user);
  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50">
      <div className="bg-orangePrimary p-4 shadow-sm sticky top-0 z-10 ">
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-2 ">
            <UserMenu />
          </div>
        </div>
      </div>

      {user?.isDelivering ? <ActiveOrder /> : <AvailableOrders />}
    </div>
  );
};

export default CourierPage;
