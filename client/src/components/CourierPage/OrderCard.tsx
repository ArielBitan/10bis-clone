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
  const user = order.user_id;

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
    if (restaurant.location?.coordinates && user.location?.coordinates) {
      const restaurantCoords = `${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`;
      const userCoords = `${user.location.coordinates[1]},${user.location.coordinates[0]}`;
      window.open(
        `https://www.waze.com/ul?ll=${userCoords}&via=${restaurantCoords}&navigate=yes`,
        "_blank"
      );
    } else {
      const restaurantDestination = encodeURIComponent(
        restaurant.location?.address || ""
      );
      const userDestination = encodeURIComponent(user.location?.address || "");
      window.open(
        `https://www.waze.com/ul?q=${restaurantDestination}&via=${userDestination}&navigate=yes`,
        "_blank"
      );
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg m-2 p-4 max-w-sm mx-auto">
      {/* Accept Order Button */}
      <div className="mb-4">
        <button
          onClick={handleAcceptOrder}
          disabled={isAccepting}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 
                     text-white py-3 px-4 rounded-lg text-base font-semibold 
                     transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          {isAccepting ? "מקבל הזמנה..." : "קבל הזמנה"}
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
          <img
            src={restaurant.image as string}
            alt={`${restaurant.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-sm flex-1">
          <h2 className="font-semibold text-gray-800">{restaurant.name}</h2>
          {restaurant.phone && (
            <p className="text-gray-600 flex items-center gap-1">
              📞 {restaurant.phone}
            </p>
          )}
        </div>
      </div>

      {/* Delivery Time */}
      <div className="text-sm text-gray-800 mb-3">
        <span className="font-semibold">זמן משלוח: </span>
        {restaurant.delivery_time?.split("כ-").slice(1, 2).join(" - ")}
      </div>

      {/* Addresses and Navigation Buttons */}
      <div className="text-sm text-gray-800 mb-3 space-y-2">
        {restaurant.location && (
          <div className="flex items-start gap-1">
            <span className="font-semibold ">כתובת מסעדה:</span>
            <span>{restaurant.location.address}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-start gap-1">
            <span className="font-semibold">כתובת לקוח:</span>
            <span>{user.location.address}</span>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={openInWaze}
            className="flex items-center justify-center gap-2 flex-1 bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold transition-colors"
          >
            <Navigation size={16} />
            Waze
          </button>
        </div>
      </div>

      {/* Order Details Button */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold transition-colors"
        onClick={toggleDetails}
      >
        {showDetails ? "הסתר פרטי הזמנה" : "הצג פרטי הזמנה"}
      </button>

      {/* Order Details */}
      {showDetails && (
        <div className="mt-4 space-y-4">
          {/* Order Items */}
          <div className="text-sm text-gray-800">
            <h3 className="font-semibold mb-2">פרטי המנות:</h3>
            <div className="space-y-2">
              {order.order_items.length > 0 ? (
                order.order_items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-100 pb-2"
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
              <h3 className="font-semibold mb-2">הוראות מיוחדות:</h3>
              <ul className="list-disc list-inside space-y-1">
                {order.special_instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-600">
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Order Summary */}
          <div className="text-sm border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">סה"כ לתשלום:</span>
              <span className="font-bold text-lg">{order.total_amount} ₪</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
