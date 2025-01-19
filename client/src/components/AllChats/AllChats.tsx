import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IOrder } from "@/types/orderTypes";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import {
  fetchOrdersByRestaurant,
  fetchOrdersByUser,
} from "@/services/orderService";
import Loading from "../Loading";
import OneChat from "./OneChat";
import { IRestaurantOwner } from "@/types/userType";

const AllChats = () => {
  const { user } = useUser();
  const userId = user?._id;
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (user?.role === "restaurant_owner") {
          const fetchedOrders = await fetchOrdersByRestaurant(
            (user as IRestaurantOwner)?.owned_restaurants?.[0]
          );
          setOrders(fetchedOrders);
        } else {
          if (userId) {
            const fetchedOrders = await fetchOrdersByUser(userId);
            setOrders(fetchedOrders);
          }
        }
        setLoading(false);
      } catch (err: unknown) {
        console.error("Error fetching orders:", err);
        setError("Error fetching orders");
        setLoading(false);
      }
    };

    getOrders();
  }, [userId, user]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user || user.role === "courier") {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          data-testid="launcher-minimize-icon"
          className="fixed z-50 flex items-center justify-center p-2 transition-transform duration-300 bg-orange-500 rounded-full cursor-pointer bottom-8 left-8 hover:scale-150"
        >
          <img
            src="https://e7.pngegg.com/pngimages/761/975/png-clipart-online-chat-chat-room-livechat-chat-hd-text-orange-thumbnail.png"
            alt="Chat Icon"
            width="30"
            height="30"
            className="rounded-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="border-none sm:max-w-[400px] dialog-slide w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-backgroundOrange">
          <div className="flex items-center justify-end gap-4 p-3 pb-0 text-white">
            <h1 className="p-4 text-3xl font-bold">כל הצ'אטים</h1>
          </div>
        </div>
        {orders.map((order) => (
          <OneChat key={order._id} order={order} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default AllChats;
