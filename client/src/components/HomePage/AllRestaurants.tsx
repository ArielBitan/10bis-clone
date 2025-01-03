import RestaurantCard from "./RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "@/services/restaurantService";

const AllRestaurants = ({}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchAllRestaurants(),
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error loading </div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="row-start-2 col-span-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start gap-y-2 gap-x-4">
        {data.map((item) => (
          <RestaurantCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
