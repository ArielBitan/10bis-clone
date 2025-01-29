import { updateOrderStatus } from "@/services/orderService";
import { IOrder } from "@/types/orderTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ActiveButtonsProps {
  activeOrder: IOrder;
  setIsDelivering: (bool: boolean) => void;
}

const ActiveButtons = ({
  activeOrder,
  setIsDelivering,
}: ActiveButtonsProps) => {
  const queryClient = useQueryClient();
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

  return (
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
  );
};

export default ActiveButtons;
