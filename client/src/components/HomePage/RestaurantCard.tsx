import { IRestaurant } from "@/types/restaurantTypes";
import StarIcon from "./StarIcon";
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
      onClick={() => navigateToDetails(item._id as string)}
      className="sm:w-[302px] max-w-[525px] w-full mb-4 border shadow-lg flex flex-col rounded-xl overflow-hidden hover:cursor-pointer"
    >
      <div className="h-[165px] w-full">
        <img
          src={item.background_image as string}
          alt="background_image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-2 px-3 flex flex-col gap-2">
        <h3 className="text-xl lg:text-[1rem] font-bold ">{item.name}</h3>
        <div className="flex gap-1 text-sm items-center ">
          <StarIcon />
          <span>{item._id && <span>{item.avgRatings?.toFixed(1)}</span>}</span>
          <span className="text-gray-400">•</span>
          <p>{item.cuisine_types.join(", ")}</p>
        </div>
        <div className="flex items-center gap-2 text-sm ">
          <span>{`משלוח ₪${item.delivery_fee || 0}`}</span>
          <span>•</span>
          <span>{`מינימום הזמנה ₪${item.min_order || 0}`}</span>
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;
