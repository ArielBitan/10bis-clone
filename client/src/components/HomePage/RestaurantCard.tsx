import { IRestaurant } from "@/types/restaurantTypes";

interface RestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item }) => {
  return <div className="w-[270px]">{item.name}</div>;
};

export default RestaurantCard;
