import { IOrder } from "@/types/orderTypes";
import { useUser } from "../context/userContext";
import Chat from "../chats/Chat";

interface OneChatProps {
  order: IOrder;
}

const OneChat: React.FC<OneChatProps> = ({ order }) => {
  const { user } = useUser();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("he-IL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div>
      <div className="flex flex-col items-end p-4 border-b border-gray-300 rtl">
        <h2 className="mb-2 text-xl font-semibold">
          {formatDate(order.createdAt)}
        </h2>

        {!user?.role ? (
          <h3 className="text-lg font-medium text-orange-500">
            {order.restaurant_id.name}
          </h3>
        ) : (
          <h3 className="text-lg font-medium text-orange-500">
            {order?.user_id?.full_name || " "}
          </h3>
        )}

        <div className="mt-2 text-sm text-gray-600">
          <div>{order._id} :מספר הזמנה</div>
        </div>
        <Chat order={order} />
      </div>
    </div>
  );
};

export default OneChat;
