import { useState, useEffect } from "react";
import Loading from "../Loading";
import RestaurantCard from "./RestaurantCard";
import { useRestaurantContext } from "../context/restaurantContext";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const AllRestaurants = () => {
  const {
    filteredRestaurants,
    isLoading,
    isError,
    filterRestaurants,
    selectedCategory,
  } = useRestaurantContext();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [randomCategories, setRandomCategories] = useState<[string, any[]][]>(
    []
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (filteredRestaurants.length > 0) {
      const grouped = filteredRestaurants.reduce(
        (acc: Record<string, any[]>, restaurant: any) => {
          restaurant.cuisine_types.forEach((type: string) => {
            if (!acc[type]) acc[type] = [];
            acc[type].push(restaurant);
          });
          return acc;
        },
        {}
      );

      // Select random categories with more than 12 restaurants
      const categoriesWithMoreThan12 = Object.entries(grouped).filter(
        ([category, restaurants]) =>
          restaurants.length > 12 && category !== selectedCategory
      );

      shuffleArray(categoriesWithMoreThan12);
      setRandomCategories(categoriesWithMoreThan12.slice(0, 5));
    }
  }, [filteredRestaurants, selectedCategory]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data.</div>;

  const getCardsPerCategory = () => {
    if (windowWidth >= 1024) return 3; // Large screens (lg)
    if (windowWidth >= 768) return 2; // Medium screens (md)
    return 1; // Mobile screens
  };

  const handleCategoryFilter = (category: string) => {
    filterRestaurants(category);
  };

  return (
    <div>
      {filteredRestaurants.length > 0 && (
        <>
          {randomCategories.map(([category, restaurants]) => (
            <div key={category} className="mb-8 relative">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <button
                onClick={() => handleCategoryFilter(category)}
                className="absolute top-0 left-0 p-2 bg-white rounded-full shadow-md h-10 w-16 border border-slate-400"
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory || "כל המסעדות"}
            </h2>
            <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} item={restaurant} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllRestaurants;
