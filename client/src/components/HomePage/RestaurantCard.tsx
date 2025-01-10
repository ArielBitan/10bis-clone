import { IRestaurant } from "@/types/restaurantTypes";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const navigateToDetails = (id: string) => {
    navigate(`/restaurant/${id}`);
  };
  return (
    <div
      onClick={() => {
        navigateToDetails(item._id as string);
      }}
      className=" max-w-[325px] mb-2 border shadow-lg"
    >
      <img
        src={item.background_image as string}
        alt="background_image"
        className="w-max"
      />
      <div className="px-4 pt-4">
        <div className="mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-sm">{item.cuisine_types.join(", ")}</p>
        </div>
        <div className="flex gap-1 items-center text-sm">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500 mb-1" />
            <span>0</span>
          </div>
          <span>•</span>
          <span>{`משלוח ₪${item.delivery_fee || 0}`}</span>
          <span>•</span>
          <span>
            {item.delivery_time
              ? item.delivery_time.split("כ-").slice(1, 2).join(" - ")
              : ""}
          </span>{" "}
        </div>
        <div className="mb-2 text-sm">
          <span>{`מינימום הזמנה  ₪${item.min_order || 0}`}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
