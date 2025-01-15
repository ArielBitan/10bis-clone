import { fetchRestaurantById } from "@/services/restaurantService";
import { useUser } from "../context/userContext";
import Chart from "../Chart";
import { OrdersTable } from "../orders/Orders";
import { IRestaurantOwner } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSocket } from "../context/socketContext";

const RestaurantOwnerDashboard = () => {
  const { user } = useUser();
  const ownedRestId = (user as IRestaurantOwner)?.owned_restaurants?.[0];
  const { socket, connected, joinRoom, leaveRoom } = useSocket();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
  } = useQuery({
    queryKey: ["restaurant", ownedRestId],
    queryFn: () => fetchRestaurantById(ownedRestId),
    enabled: !!ownedRestId,
  });

  useEffect(() => {
    if (!connected || !ownedRestId || !socket) {
      return;
    }
    const handleOrderUpdate = (data: { message: string }) => {
      console.log("Order update received:", data);

      toast({ title: "הזמנה התקבלה", description: data.message });
    };
    const subscribeToUpdates = () => {
      if (!isSubscribed) {
        joinRoom(ownedRestId);
        setIsSubscribed(true);
      }
    };

    const unsubscribeFromUpdates = () => {
      if (isSubscribed) {
        leaveRoom(ownedRestId);
        setIsSubscribed(false);
      }
    };

    subscribeToUpdates();
    console.log("subscribed to order-update");
    socket.on("order-update", handleOrderUpdate);

    return () => {
      socket.off("order-update", handleOrderUpdate);
      unsubscribeFromUpdates();
    };
  }, [socket, connected, ownedRestId, isSubscribed]);

  if (isRestaurantLoading) return <Loading />;
  if (isRestaurantError)
    return (
      <div>
        Error loading
        <Loading />
      </div>
    );
  if (!restaurant) return <div>No restaurant data available</div>;

  return (
    <div>
      <div className="relative">
        <img
          src={restaurant?.background_image as string}
          alt="background_image"
          className="object-fill max-h-[400px] w-full"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0 85%, 100% 65%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center top-3/4">
          <img
            src={restaurant?.image as string}
            alt="logo"
            className="object-cover border-4 rounded-full w-36 h-36 border-slate-100"
          />
          <div className="p-3 mb-10 text-3xl font-bold">
            {" "}
            {restaurant?.name}
          </div>
        </div>
      </div>
      <h2 className="text-xl text-center">{restaurant.description}</h2>
      <div className="px-4 mt-[100px] flex flex-col items-center justify-center">
        <div className="mb-2 text-xl">כל ההזמנות</div>
        {restaurant._id ? (
          <OrdersTable restId={restaurant._id} />
        ) : (
          <div>No restaurant ID available</div>
        )}{" "}
        {restaurant?._id ? <Chart id={restaurant._id} /> : <div>xxx</div>}
      </div>
    </div>
  );
};
export default RestaurantOwnerDashboard;
