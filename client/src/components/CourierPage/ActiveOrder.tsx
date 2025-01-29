import { MapPin, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { IOrder } from "@/types/orderTypes";
import { useQuery } from "@tanstack/react-query";
import { getActiveOrder } from "@/services/orderService";
import NextLocationCard from "./NextLocationCard";
import Loading from "../Loading";
import { useSocket } from "../context/socketContext";
import { useEffect, useState } from "react";
import OrderStatus from "./OrderStatus";
import OrderItems from "./OrderItems";
import ActiveButtons from "./ActiveButtons";

interface ActiveOrderProps {
  setIsDelivering: React.Dispatch<React.SetStateAction<Boolean>>;
}

const ActiveOrder: React.FC<ActiveOrderProps> = ({ setIsDelivering }) => {
  const { socket, connected, joinRoom, leaveRoom } = useSocket();

  const {
    data: activeOrder,
    isLoading,
    isError,
  } = useQuery<IOrder | null>({
    queryKey: ["activeOrder"],
    queryFn: () => getActiveOrder(),
  });

  const [courierPosition, setCourierPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Order Status */}
            <OrderStatus
              activeOrderId={activeOrder._id}
              createdAt={activeOrder.createdAt}
              status={activeOrder.status}
            />

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
                address={activeOrder.userAddress}
                phone={activeOrder.user_id.phone}
                icon={User}
              />
            )}

            <OrderItems order_items={activeOrder.order_items} />

            {/* Action Buttons */}
            <ActiveButtons
              activeOrder={activeOrder}
              setIsDelivering={setIsDelivering}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ActiveOrder;
