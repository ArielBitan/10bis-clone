import RestaurantCard from "./RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "@/services/restaurantService";
import { useEffect } from "react";
import Loading from "../Loading";

const AllRestaurants = ({}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchAllRestaurants(),
  });

  useEffect(() => {
    localStorage.setItem("cartDetail", JSON.stringify([]));
  }, []);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        Error loading
        <Loading />
      </div>
    );
  if (!data) return <div>No data available</div>;

  return (
    <div className="col-span-4 row-start-2">
      <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        {data.map((item) => (
          <RestaurantCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
