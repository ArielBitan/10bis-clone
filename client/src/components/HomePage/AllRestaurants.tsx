import RestaurantCard from "./RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "@/services/restaurantService";
import { useState, useEffect } from "react";
import Loading from "../Loading";

interface AllRestaurantsProps {
  selectedFilters: string[];
}

const AllRestaurants: React.FC<AllRestaurantsProps> = ({ selectedFilters }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchAllRestaurants(),
  });

  console.log(selectedFilters);

  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [groupedRestaurants, setGroupedRestaurants] = useState<
    Record<string, any[]>
  >({});

  useEffect(() => {
    localStorage.setItem("cartDetail", JSON.stringify([]));
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);

      setFilteredRestaurants(data);
      if (selectedFilters.length > 0) {
        const filtered = data.filter((restaurant: any) =>
          selectedFilters.every((filter) =>
            restaurant.cuisine_types.includes(filter)
          )
        );
        setFilteredRestaurants(filtered);
      } else {
        const grouped = data.reduce(
          (acc: Record<string, any[]>, restaurant: any) => {
            restaurant.cuisine_types.forEach((type: string) => {
              if (!acc[type]) acc[type] = [];
              acc[type].push(restaurant);
            });
            return acc;
          },
          {}
        );
        setGroupedRestaurants(grouped);
      }
    }
  }, [data, selectedFilters]);

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
    <div className="w-max col-span-4 row-start-2">
      {selectedFilters.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {selectedFilters.join(", ")}
          </h2>
          <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} item={restaurant} />
            ))}
          </div>
        </div>
      ) : (
        Object.entries(groupedRestaurants).map(([category, restaurants]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} item={restaurant} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllRestaurants;
