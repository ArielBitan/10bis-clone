import { acceptOrder, fetchOrdersByStatus } from "@/services/orderService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Package } from "lucide-react";
import OrderCard from "./OrderCard/OrderCard";
import { IOrder } from "@/types/orderTypes";
import { useUser } from "../context/userContext";
import Loading from "../Loading";

interface AvailableOrdersProps {
  setIsDelivering: React.Dispatch<React.SetStateAction<Boolean>>;
}

const AvailableOrders: React.FC<AvailableOrdersProps> = ({
  setIsDelivering,
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<IOrder[]>({
    queryKey: ["openOrders"],
    queryFn: () => fetchOrdersByStatus("Open"),
    refetchInterval: 5000,
  });

  const handleAcceptOrder = async (order: IOrder) => {
    try {
      if (!user || !user._id) {
        console.error("User not found or invalid.");
        return;
      }
      await acceptOrder(order._id);
      queryClient.invalidateQueries({ queryKey: ["activeOrder"] });
    } catch (error) {
      console.error("Failed to accept order:", error);
      throw error;
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        שגיאה בטעינה
        <Loading />
      </div>
    );

  return (
    <div>
      {data.length > 0 ? (
        data.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            setIsDelivering={setIsDelivering}
            onAcceptOrder={handleAcceptOrder}
          />
        ))
      ) : (
        <div className="p-4 flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <Package className="w-16 h-16 text-gray-400" />
          <h2 className="text-xl font-medium">זמין למשלוחים</h2>
          <p className="text-gray-500">אנחנו נודיע לך כשיהיו משלוחים זמינים</p>
        </div>
      )}
    </div>
  );
};

export default AvailableOrders;
