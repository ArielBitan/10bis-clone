import { IOrder } from "@/types/orderTypes";
import { CheckCircle, Navigation } from "lucide-react";
import { useState } from "react";

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
    const restaurantDestination = encodeURIComponent(
      restaurant.location?.address || ""
    );
    const userDestination = encodeURIComponent(order.userAddress || "");
    window.open(
      `https://www.waze.com/ul?q=${restaurantDestination}&via=${userDestination}&navigate=yes`,
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
                  {new Date(order.createdAt).toLocaleString("he-IL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </h3>
      </div>

      {/* Restaurant Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
          <img
            src={restaurant.image as string}
            alt={`${restaurant.name} logo`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 text-sm">
          <h2 className="font-semibold text-gray-800">{restaurant.name}</h2>
          {restaurant.phone && (
            <p className="flex items-center gap-1 text-gray-600">
              📞 {restaurant.phone}
            </p>
          )}
        </div>
      </div>

      {/* Delivery Time */}
      <div className="mb-3 text-sm text-gray-800">
        <span className="font-semibold">זמן משלוח: </span>
        {restaurant.delivery_time?.split("כ-").slice(1, 2).join(" - ")}
      </div>

      {/* Addresses and Navigation Buttons */}
      <div className="mb-3 space-y-2 text-sm text-gray-800">
        {restaurant.location && (
          <div className="flex items-start gap-1">
            <span className="font-semibold ">כתובת מסעדה:</span>
            <span>{restaurant.location.address}</span>
          </div>
        )}
        {order.userAddress && (
          <div className="flex items-start gap-1">
            <span className="font-semibold">כתובת לקוח:</span>
            <span>{order.userAddress}</span>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={openInWaze}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors bg-green-500 rounded-full hover:bg-blue-600"
          >
            <Navigation size={16} />
            Waze
          </button>
        </div>
      </div>

      {/* Order Details Button */}
      <button
        className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
        onClick={toggleDetails}
      >
        {showDetails ? "הסתר פרטי הזמנה" : "הצג פרטי הזמנה"}
      </button>

      {/* Order Details */}
      {showDetails && (
        <div className="mt-4 space-y-4">
          {/* Order Items */}
          <div className="text-sm text-gray-800">
            <h3 className="mb-2 font-semibold">פרטי המנות:</h3>
            <div className="space-y-2">
              {order.order_items.length > 0 ? (
                order.order_items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between pb-2 border-b border-gray-100"
                  >
                    <span>{item._id.name}</span>
                    <span className="font-medium">{item._id.price} ₪</span>
                  </div>
                ))
              ) : (
                <p>לא נוספו מנות</p>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          {order.special_instructions.length > 0 && (
            <div className="text-sm text-gray-800">
              <h3 className="mb-2 font-semibold">הוראות מיוחדות:</h3>
              <ul className="space-y-1 list-disc list-inside">
                {order.special_instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-600">
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Order Summary */}
          <div className="pt-3 text-sm border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold">סה"כ לתשלום:</span>
              <span className="text-lg font-bold">{order.total_amount} ₪</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
