import { fetchOrdersByStatus } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import OrderCard from "./OrderCard";

const AvailableOrders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["openOrders"],
    queryFn: () => fetchOrdersByStatus("Open"),
  });

  if (isLoading) return <div>טוען ...</div>;
  if (isError) return <div>שגיאה בטעינה </div>;

  return (
    <div>
      {data ? (
        data.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <div className="p-4 flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <Package className="h-16 w-16 text-gray-400" />
          <h2 className="text-xl font-medium">זמין למשלוחים</h2>
          <p className="text-gray-500">אנחנו נודיע לך כשיהיו משלוחים זמינים</p>
        </div>
      )}
    </div>
  );
};

export default AvailableOrders;
