import { fetchRestaurantById } from "@/services/restaurantService";
import { useUser } from "../context/userContext";
import Chart from "../Chart";
import Order from "../orders/Order";
import { OrdersTable } from "../orders/Orders";
import { IRestaurantOwner } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";

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

  if (isRestaurantLoading) return <div>Loading ...</div>;
  if (isRestaurantError) return <div>Error loading</div>;
  if (!restaurant) return <div>No restaurant data available</div>;

  return (
    <div>
      <div className="relative">
        <img
          src={restaurant?.background_image as string}
          alt="background_image"
          className="object-fill max-h-[400px] w-full"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0 85%, 100% 65%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center top-3/4">
          <img
            src={restaurant?.image as string}
            alt="logo"
            className="object-cover border-4 rounded-full w-36 h-36 border-slate-100"
          />
          <div className="p-3 text-3xl font-bold shadow-sm ">
            {" "}
            {restaurant?.name}
          </div>
        </div>
      </div>
      <div className="px-4 mt-[100px] flex flex-col items-center justify-center">
        <div className="mb-2 text-xl">כל ההזמנות</div>
        <OrdersTable />
        <Order />
        {restaurant?._id ? <Chart id={restaurant._id} /> : <div>xxx</div>}
      </div>
    </div>
  );
};
export default RestaurantOwnerDashboard;
