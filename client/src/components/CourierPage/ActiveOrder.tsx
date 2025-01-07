import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Phone,
  Package,
  User,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { IOrder } from "@/types/orderTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveOrder, updateOrderStatus } from "@/services/orderService";

interface ActiveOrderProps {
  setIsDelivering: React.Dispatch<React.SetStateAction<Boolean>>;
}

const ActiveOrder: React.FC<ActiveOrderProps> = ({ setIsDelivering }) => {
  const queryClient = useQueryClient();

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

  const handleOrderStatusChange = (newStatus: string) => {
    if (!activeOrder) return;
    mutation.mutate(
      {
        orderId: activeOrder._id,
        status: newStatus,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["activeOrder"] });
          if (newStatus === "Delivered") {
            setIsDelivering(false);
          }
        },
        onError: (error) => {
          console.error("Failed to update order status:", error);
        },
      }
    );
  };

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error loading </div>;

  if (!activeOrder) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
        <Package className="h-16 w-16 text-gray-400" />
        <h2 className="text-xl font-medium">אין הזמנה נוכחית</h2>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                הזמנה נוכחית #{activeOrder._id}
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {activeOrder.status === "Accepted" ? "איסוף" : "משלוח"}
              </span>
            </div>

            {/* Restaurant Details */}
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">
                    {activeOrder.restaurant_id.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activeOrder.restaurant_id.location?.address}
                  </p>
                </div>
              </div>
              {activeOrder.restaurant_id.phone && (
                <a
                  href={`tel:${activeOrder.restaurant_id.phone}`}
                  className="flex items-center gap-2 text-blue-500"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">
                    {activeOrder.restaurant_id.phone}
                  </span>
                </a>
              )}
            </div>

            {/* Customer Details */}
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">
                    {activeOrder.user_id.first_name}{" "}
                    {activeOrder.user_id.last_name}
                  </p>
                  <a
                    href={`tel:${activeOrder.user_id.phone}`}
                    className="text-sm text-blue-500"
                  >
                    {activeOrder.user_id.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              <h3 className="font-medium">פריטי הזמנה:</h3>
              <ul className="text-sm text-gray-600">
                {activeOrder.order_items.map((item) => (
                  <li key={item._id} className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    {item.name} - {item.price} ₪
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
                  className="w-full py-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 disabled:bg-gray-400"
                >
                  <CheckCircle className="h-5 w-5" />
                  {mutation.isPending ? "מעדכן..." : "אשר איסוף"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleOrderStatusChange("Delivered");
                  }}
                  disabled={mutation.isPending}
                  className="w-full py-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 disabled:bg-gray-400"
                >
                  <CheckCircle className="h-5 w-5" />
                  {mutation.isPending ? "מעדכן..." : "אשר משלוח"}
                </button>
              )}
              <button className="w-full py-3 border border-red-500 text-red-500 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                <AlertCircle className="h-5 w-5" />
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
