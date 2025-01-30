import { IOrder } from "@/types/orderTypes";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import RestaurantInfo from "./RestaurantInfo";
import { formatDate, generateWazeUrl } from "./utils";
import OrderDetails from "./OrderDetails";
import DeliveryAddresses from "./DeliveryAddresses";

interface IOrderCardProps {
  order: IOrder;
  onAcceptOrder: (order: IOrder) => void;
  setIsDelivering: React.Dispatch<React.SetStateAction<Boolean>>;
}

const OrderCard: React.FC<IOrderCardProps> = ({
  order,
  onAcceptOrder,
  setIsDelivering,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const restaurant = order.restaurant_id;

  const handleAcceptOrder = async () => {
    setIsAccepting(true);
    try {
      setIsDelivering(true);
      await onAcceptOrder(order);
    } catch (error) {
      console.error("Error accepting order:", error);
    } finally {
      setIsAccepting(false);
    }
  };

  const toggleDetails = () => setShowDetails(!showDetails);

  const openInWaze = () => {
    window.open(
      generateWazeUrl(restaurant.location?.address, order.userAddress),
      "_blank"
    );
  };

  return (
    <div className="max-w-sm p-4 m-2 mx-auto bg-white rounded-lg shadow-md">
      {/* Accept Order Button */}
      <div className="mb-4">
        <button
          onClick={handleAcceptOrder}
          disabled={isAccepting}
          className="flex items-center justify-center w-full gap-2 px-4 py-3 text-base font-semibold text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
        >
          <CheckCircle size={20} />
          {isAccepting ? "מקבל הזמנה..." : "קבל הזמנה"}
        </button>
        <h3 className="text-center text-textBlackSecondary">
          {formatDate(order.createdAt)}
        </h3>
      </div>
      <RestaurantInfo restaurant={restaurant} />

      {/* Delivery Time */}
      <div className="mb-3 text-sm text-gray-800">
        <span className="font-semibold">זמן משלוח: </span>
        {restaurant.delivery_time?.split("כ-").slice(1, 2).join(" - ")}
      </div>

      <DeliveryAddresses
        restaurant={restaurant}
        order={order}
        onNavigate={openInWaze}
      />

      {/* Order Details Button */}
      <button
        className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
        onClick={toggleDetails}
      >
        {showDetails ? "הסתר פרטי הזמנה" : "הצג פרטי הזמנה"}
      </button>

      {/* Order Details */}
      {showDetails && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderCard;
