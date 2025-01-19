import { IRestaurant } from "@/types/restaurantTypes";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AvgRating from "../DetailPage/AvgRating";

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
      className=" sm:w-[302px] max-w-[525px] w-full mb-2 border shadow-lg"
    >
      <img
        src={item.background_image as string}
        alt="background_image"
        className="object-cover w-full"
      />
      <div className="px-4 pt-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm">{item.cuisine_types.join(", ")}</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex items-center gap-1">
            <FaStar className="mb-1 text-yellow-500" />
            <span>
              {" "}
              {item._id && (
                <span>
                  <AvgRating id={item._id} />
                </span>
              )}
            </span>
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
