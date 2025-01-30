import { IOrder } from "@/types/orderTypes";
import { IRestaurant } from "@/types/restaurantTypes";
import { Navigation } from "lucide-react";

interface DeliveryAddressesProps {
  restaurant: IRestaurant;
  order: IOrder;
  onNavigate: () => void;
}

const DeliveryAddresses = ({
  restaurant,
  order,
  onNavigate,
}: DeliveryAddressesProps) => {
  return (
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
          onClick={() => onNavigate()}
          className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors bg-green-500 rounded-full hover:bg-blue-600"
        >
          <Navigation size={16} />
          Waze
        </button>
      </div>
    </div>
  );
};

export default DeliveryAddresses;
