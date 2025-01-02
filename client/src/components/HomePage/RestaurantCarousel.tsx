import RestaurantCard from "./RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "@/services/restaurantService";

const RestaurantCarousel = ({}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchAllRestaurants(),
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error loading </div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <div className="carousel">
        {data.map((item) => (
          <div key={item._id}>
            <RestaurantCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCarousel;
