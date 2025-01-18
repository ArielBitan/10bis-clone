import { useSocket } from "@/components/context/socketContext";
import { useUser } from "@/components/context/userContext";
import Navbar from "@/components/layout/Navbar";
import Loading from "@/components/Loading";
import OrderRest from "@/components/orders/OrderRest";
import { fetchOrdersByRestaurant } from "@/services/orderService";
import { IRestaurantOwner } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const RestaurantOrderManagement = () => {
  const { user } = useUser();
  const [ownedRestId, setOwnedRestId] = useState<string | undefined>(undefined);
  const { newOrderReceived } = useSocket();

  // Update ownedRestId when user data is available
  useEffect(() => {
    if (user && (user as IRestaurantOwner)?.owned_restaurants?.[0]) {
      setOwnedRestId((user as IRestaurantOwner)?.owned_restaurants?.[0]);
    }
  }, [user]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ordersByRestaurant", ownedRestId],
    queryFn: () => fetchOrdersByRestaurant(ownedRestId as string),
    enabled: !!ownedRestId,
  });

  useEffect(() => {
    if (newOrderReceived) {
      refetch();
    }
  }, [newOrderReceived]);

  const refetchOrders = () => {
    refetch();
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        Error loading
        <Loading />
      </div>
    );
  if (!data) return <div>No data available</div>;

  const undeliveredOrders = data
    .filter((order) => order.status !== "Delivered")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <div className="relative">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="my-10 text-5xl text-textBlackSecondary">הזמנות חדשות</h1>

        {undeliveredOrders.length > 0 ? (
          <div>
            {undeliveredOrders.map((order) => (
              <OrderRest
                order={order}
                key={order._id}
                refetchOrders={refetchOrders}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-xl">אין הזמנות פעילות</h1>
        )}
      </div>
    </div>
  );
};
export default RestaurantOrderManagement;
