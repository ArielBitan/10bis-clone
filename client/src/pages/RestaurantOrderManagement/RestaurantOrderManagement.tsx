import { useUser } from "@/components/context/userContext";
import Navbar from "@/components/layout/Navbar";
import Loading from "@/components/Loading";
import OrderRest from "@/components/orders/OrderRest";
import { fetchOrdersByRestaurant } from "@/services/orderService";
import { IRestaurantOwner } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";
// import { log } from "console";
const RestaurantOrderManagement = () => {
  const { user } = useUser();
  const ownedRestId = (user as IRestaurantOwner)?.owned_restaurants?.[0];
  console.log(ownedRestId);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ordersByRestaurant"],
    queryFn: () =>
      fetchOrdersByRestaurant(
        ownedRestId
        // "6776fdb5d1030347fd0fabd7"
      ),
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        Error loading
        <Loading />
      </div>
    );
  if (!data) return <div>No data available</div>;
  console.log(data);

  return (
    <div className="relative">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-10 text-5xl text-textBlackSecondary">הזמנות חדשות</h1>

        {data.length > 0 ? (
          <div>
            {data.map((order) => (
              <OrderRest order={order} key={order._id} />
            ))}
          </div>
        ) : (
          <h1 className="text-xl">אין הזמנות פעילות</h1>
        )}
      </div>
    </div>
  );
};
export default RestaurantOrderManagement;
