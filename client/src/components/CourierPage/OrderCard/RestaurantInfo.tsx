import { IRestaurant } from "@/types/restaurantTypes";

interface RestaurantInfoProps {
  restaurant: IRestaurant;
}

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
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
  );
};

export default RestaurantInfo;
