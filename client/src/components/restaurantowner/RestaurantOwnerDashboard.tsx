import { fetchRestaurantById } from "@/services/restaurantService";
import { useUser } from "../context/userContext";
import Chart from "../Chart";
import { OrdersTable } from "../orders/Orders";
import { IRestaurantOwner } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import RestaurantHeader from "../DetailPage/RestaurantHeader";

const RestaurantOwnerDashboard = () => {
  const { user } = useUser();
  const ownedRestId = (user as IRestaurantOwner)?.owned_restaurants?.[0];

  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
  } = useQuery({
    queryKey: ["restaurant", ownedRestId],
    queryFn: () => fetchRestaurantById(ownedRestId),
    enabled: !!ownedRestId,
  });

  if (isRestaurantLoading) return <Loading />;
  if (isRestaurantError)
    return (
      <div>
        <Loading />
      </div>
    );
  if (!restaurant) return <div>No restaurant data available</div>;

  return (
    <div className="bg-white">
      <RestaurantHeader data={restaurant} />
      <div className="flex flex-col justify-center mt-8 mb-20">
        <h1 className="text-4xl font-bold text-center"> {restaurant?.name}</h1>
        <h2 className="text-xl text-center">{restaurant.description}</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="mb-8 text-3xl font-medium">כל ההזמנות</h3>
        {restaurant._id ? (
          <OrdersTable restId={restaurant._id} />
        ) : (
          <div>No restaurant ID available</div>
        )}{" "}
        {restaurant?._id ? <Chart id={restaurant._id} /> : <div>xxx</div>}
      </div>
    </div>
  );
};
export default RestaurantOwnerDashboard;
