import { AlertCircle, CheckCircle, MapPin, Package, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { IOrder } from "@/types/orderTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveOrder, updateOrderStatus } from "@/services/orderService";
import NextLocationCard from "./NextLocationCard";
import Loading from "../Loading";
import { useSocket } from "../context/socketContext";
import { useEffect, useState } from "react";

interface ActiveOrderProps {
  setIsDelivering: React.Dispatch<React.SetStateAction<Boolean>>;
}

const ActiveOrder: React.FC<ActiveOrderProps> = ({ setIsDelivering }) => {
  const { socket, connected, joinRoom, leaveRoom } = useSocket();
  const queryClient = useQueryClient();
  const userAddress = localStorage.getItem("userAddress");

  const {
    data: activeOrder,
    isLoading,
    isError,
  } = useQuery<IOrder | null>({
    queryKey: ["activeOrder"],
    queryFn: () => getActiveOrder(),
  });

  const mutation = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: string;
    }) => {
      return await updateOrderStatus(orderId, status);
    },
  });

  const [courierPosition, setCourierPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleOrderStatusChange = (newStatus: string) => {
    if (!activeOrder) return;

    mutation.mutate(
      {
        orderId: activeOrder._id,
        status: newStatus,
      },
      {
        onSuccess: () => {
          if (newStatus === "Delivered") {
            setIsDelivering(false);
            return;
          }
        },
        onSettled: () => {
          queryClient.refetchQueries({ queryKey: ["activeOrder"] });
        },
        onError: (error) => {
          console.error("Failed to update order status:", error);
        },
      }
    );
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCourierPosition({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!socket || !connected || !courierPosition || !activeOrder) {
      return;
    }

    joinRoom(activeOrder._id.toString());

    return () => leaveRoom(activeOrder._id.toString());
  }, [socket, connected, courierPosition, activeOrder]);

  useEffect(() => {
    if (!socket || !connected || !courierPosition || !activeOrder) {
      return;
    }
    socket.emit("courierLocation", {
      orderId: activeOrder._id,
      location: courierPosition,
    });
  }, [courierPosition, socket, connected, activeOrder]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        Error loading
        <Loading />
      </div>
    );
  if (!activeOrder) return <Loading />;
  console.log(activeOrder.order_items);
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">
                  הזמנה נוכחית #{activeOrder._id}
                </h2>
                <h3 className="text-textBlackSecondary">
                  {new Date(activeOrder.createdAt).toLocaleString("he-IL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </h3>
              </div>
              <span className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full">
                {activeOrder.status === "Accepted" ? "איסוף" : "משלוח"}
              </span>
            </div>

            {/* Next Location */}
            {activeOrder.status === "Accepted" ? (
              <NextLocationCard
                name={activeOrder.restaurant_id.name}
                address={activeOrder.restaurant_id.location?.address}
                phone={activeOrder.restaurant_id.phone}
                icon={MapPin}
              />
            ) : (
              <NextLocationCard
                name={`${activeOrder.user_id.first_name}  ${activeOrder.user_id.last_name}`}
                address={userAddress as string}
                phone={activeOrder.user_id.phone}
                icon={User}
              />
            )}

            {/* Order Items */}
            <div className="space-y-2">
              <h3 className="font-medium">פריטי הזמנה:</h3>
              <ul className="text-sm text-gray-600">
                {activeOrder.order_items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="font-medium">{item._id.name}</span>
                        <span className="mr-2 text-gray-600">
                          {item.quantity}x
                        </span>
                      </div>
                    </div>
                    <div className="font-medium text-right">
                      {(item._id.price * item.quantity).toFixed(2)} ₪
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {activeOrder.status === "Accepted" ? (
                <button
                  onClick={() => handleOrderStatusChange("Picked Up")}
                  disabled={mutation.isPending}
                  className="flex items-center justify-center w-full gap-2 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  {mutation.isPending ? "מעדכן..." : "אשר איסוף"}
                </button>
              ) : (
                <button
                  onClick={() => handleOrderStatusChange("Delivered")}
                  disabled={mutation.isPending}
                  className="flex items-center justify-center w-full gap-2 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  {mutation.isPending ? "מעדכן..." : "אשר משלוח"}
                </button>
              )}
              <button className="flex items-center justify-center w-full gap-2 py-3 text-red-500 border border-red-500 rounded-lg hover:bg-gray-100">
                <AlertCircle className="w-5 h-5" />
                דיווח על תקלה
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ActiveOrder;
