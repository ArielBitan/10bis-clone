import { IRestaurant } from "@/types/restaurantTypes";
import { FaStar } from "react-icons/fa6";

interface RestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item }) => {
  return (
    <div className="w-[325px] border mb-4 shadow-lg">
      <div>
        <img src={item.background_image} alt="background_image" />
        <div>
          <div className="px-4 pt-4">
            <div className="mb-2">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm">{item.cuisine_types.join(", ")}</p>
            </div>
            <div>
              <div className="flex gap-1 items-center text-sm">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500 mb-1" />
                  <span>0</span>
                </div>
                <span>•</span>
                <span>{`משלוח ₪${item.delivery_fee || 0}`}</span>
                <span>•</span>
                <span>{`${item.delivery_time || ""}`}</span>
              </div>
              <div className="mb-4 text-sm">
                <span>{`מינימום הזמנה  ₪${item.min_order || 0}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
