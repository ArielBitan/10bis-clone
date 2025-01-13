import RestaurantCard from "./RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "@/services/restaurantService";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const AllRestaurants = ({}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchAllRestaurants(),
  });
  const [filteredCategory, setFilteredCategory] = useState(null);
  console.log(data);

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
  console.log(data);

  return (
    <div className=" w-max col-span-4 row-start-2 ">
      <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        {data.map((item) => (
          <RestaurantCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
