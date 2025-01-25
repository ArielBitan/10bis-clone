import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "@/services/restaurantService";
import Loading from "../Loading";
import RestaurantCard from "./RestaurantCard";
// import RestaurantCarousel from "./CategoriesSection/RestaurantCarousel";

interface AllRestaurantsProps {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  onFilterChange: (filters: string[]) => void;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const AllRestaurants: React.FC<AllRestaurantsProps> = ({
  selectedFilters,
  onFilterChange,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchAllRestaurants,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [groupedRestaurants, setGroupedRestaurants] = useState<
    Record<string, any[]>
  >({});
  const [randomCategories, setRandomCategories] = useState<[string, any[]][]>(
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (data) {
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

        const categoriesWithMoreThan12 = Object.entries(grouped).filter(
          ([, restaurants]) => restaurants.length > 12
        );
        shuffleArray(categoriesWithMoreThan12);
        setRandomCategories(categoriesWithMoreThan12.slice(0, 5));
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

  const handleCategoryFilter = (category: string) => {
    // Apply the filter when the "View All" button is clicked for a specific category
    onFilterChange([category]);
  };

  const getCardsPerCategory = () => {
    if (windowWidth >= 1024) {
      return 3; // Large screens (lg)
    } else if (windowWidth >= 768) {
      return 2; // Medium screens (md)
    } else {
      return 1; // Mobile screens
    }
  };

  return (
    <div>
      {selectedFilters.length > 0 ? (
        // Render filtered restaurants
        <div>
          <h2 className="text-2xl font-bold mb-4 mx-4">
            {selectedFilters.join(", ")}
          </h2>
          <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} item={restaurant} />
            ))}
          </div>
        </div>
      ) : (
        // Render grouped categories (first 5 as carousels, the rest as regular grids)
        <>
          {randomCategories.map(([category, restaurants]) => (
            <div key={category} className="mb-8 relative">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <button
                onClick={() => handleCategoryFilter(category)}
                className=" absolute top-0 left-0 p-2 bg-white rounded-full shadow-md h-10 w-16 border border-slate-400"
              >
                עוד
              </button>
              <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
                {restaurants
                  .slice(0, getCardsPerCategory())
                  .map((restaurant) => (
                    <RestaurantCard key={restaurant._id} item={restaurant} />
                  ))}
              </div>
            </div>
          ))}
          {Object.entries(groupedRestaurants)
            .filter(
              ([category]) =>
                !randomCategories.some(
                  ([randomCategory]) => randomCategory === category
                )
            )
            .map(([category, restaurants]) => {
              // Apply filtering to the remaining categories
              const filteredRestaurants = restaurants.filter((restaurant) =>
                selectedFilters.every((filter) =>
                  restaurant.cuisine_types.includes(filter)
                )
              );
              return (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{category}</h2>
                  <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
                    {filteredRestaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant._id} item={restaurant} />
                    ))}
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default AllRestaurants;
