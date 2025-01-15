import { useSocket } from "@/components/context/socketContext";
import { useUser } from "@/components/context/userContext";
import Navbar from "@/components/layout/Navbar";
import Loading from "@/components/Loading";
import OrderRest from "@/components/orders/OrderRest";
import { useToast } from "@/hooks/use-toast";
import { fetchOrdersByRestaurant } from "@/services/orderService";
import { IRestaurantOwner } from "@/types/userType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const RestaurantOrderManagement = () => {
  const { user } = useUser();
  const [ownedRestId, setOwnedRestId] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();
  const { socket, connected } = useSocket();
  const { toast } = useToast();

  // Update ownedRestId when user data is available
  useEffect(() => {
    if (user && (user as IRestaurantOwner)?.owned_restaurants?.[0]) {
      setOwnedRestId((user as IRestaurantOwner)?.owned_restaurants?.[0]);
    }
  }, [user]);

  useEffect(() => {
    if (!connected || !ownedRestId || !socket) {
      return;
    }

    const handleOrderUpdate = (data: { message: string }) => {
      console.log("Order update received:", data);
      queryClient.invalidateQueries({
        queryKey: ["ordersByRestaurant", ownedRestId],
      });
      toast({ title: "הזמנה התקבלה", description: data.message });
    };

    socket.on("order-received", handleOrderUpdate);

    return () => {
      socket.off("order-received", handleOrderUpdate);
    };
  }, [socket, connected, ownedRestId]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ordersByRestaurant", ownedRestId],
    queryFn: () => fetchOrdersByRestaurant(ownedRestId as string),
    enabled: !!ownedRestId,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        Error loading
        <Loading />
      </div>
    );
  if (!data) return <div>No data available</div>;
  return (
    <div className="relative">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-10 text-5xl text-textBlackSecondary">הזמנות חדשות</h1>

        {data.length > 0 ? (
          <div>
            {data.map((order) => (
              <OrderRest order={order} key={order._id} />
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
