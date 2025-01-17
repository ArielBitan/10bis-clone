import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRestaurants } from "@/services/restaurantService";
import Loading from "../Loading";
import RestaurantCard from "./RestaurantCard";

interface AllRestaurantsProps {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  onFilterChange: (filters: string[]) => void;
}

// const shuffleArray = (array: any[]) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//   }
// };

const AllRestaurants: React.FC<AllRestaurantsProps> = ({ selectedFilters }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchAllRestaurants,
  });

  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [groupedRestaurants, setGroupedRestaurants] = useState<
    Record<string, any[]>
  >({});
  // const shuffledCategories = [...Object.entries(groupedRestaurants)];
  // shuffleArray(shuffledCategories);

  // Initialize cart details in localStorage
  useEffect(() => {
    localStorage.setItem("cartDetail", JSON.stringify([]));
  }, []);

  // Group and filter restaurants
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

  // Shuffle and filter categories with more than 12 restaurants
  // const shuffledCategories = Object.entries(groupedRestaurants);
  // shuffleArray(shuffledCategories);

  // const categoriesWithMoreThan12Restaurants = shuffledCategories.filter(
  //   ([category, restaurants]) => restaurants.length > 12
  // );

  // const randomCategories = categoriesWithMoreThan12Restaurants.slice(0, 5);

  return (
    <div className="w-max col-span-4 row-start-2">
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
        // Render grouped restaurants
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

//   randomCategories.map(([category, restaurants]) => (
//     <div key={category} className="mb-8">
//       <h2 className="text-2xl font-bold ">{category}</h2>
//       <RestaurantCarousel restaurants={restaurants} />
//     </div>
//   ))
// )}
{
  /* {Object.entries(groupedRestaurants).map(
        ([category, restaurants], index) =>
          !randomCategories.some(
            ([randomCategory]) => randomCategory === category
          ) && (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant._id} item={restaurant} />
                ))}
              </div>
            </div> */
}

// const AllRestaurants: React.FC<AllRestaurantsProps> = ({ selectedFilters }) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["restaurants"],
//     queryFn: fetchAllRestaurants,
//   });

//   const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
//   const [groupedRestaurants, setGroupedRestaurants] = useState<
//     Record<string, any[]>
//   >({});
//   const [currentFilter, setCurrentFilter] = useState<string | null>(null);

//   useEffect(() => {
//     if (data) {
//       // Group restaurants by category
//       const grouped = data.reduce(
//         (acc: Record<string, any[]>, restaurant: any) => {
//           restaurant.cuisine_types.forEach((type: string) => {
//             if (!acc[type]) acc[type] = [];
//             acc[type].push(restaurant);
//           });
//           return acc;
//         },
//         {}
//       );
//       setGroupedRestaurants(grouped);

//       // Handle filters
//       if (selectedFilters.length > 0) {
//         const filtered = data.filter((restaurant: any) =>
//           selectedFilters.every((filter) =>
//             restaurant.cuisine_types.includes(filter)
//           )
//         );
//         setFilteredRestaurants(filtered);
//       }
//     }
//   }, [data, selectedFilters]);

//   const handleViewAllClick = (category: string) => {
//     setCurrentFilter(category);
//   };

//   if (isLoading) return <Loading />;
//   if (isError) return <div>Error loading restaurants</div>;
//   if (!data) return <div>No data available</div>;

//   // Shuffle and get categories with more than 12 restaurants
//   const shuffledCategories = Object.entries(groupedRestaurants);
//   shuffleArray(shuffledCategories);

//   const randomCategories = shuffledCategories.filter(
//     ([category, restaurants]) => restaurants.length > 12
//   );

//   return (
//     <div className="w-max col-span-4 row-start-2">
//       {currentFilter ? (
//         // Render filtered restaurants when a filter is applied
//         <div>
//           <h2 className="text-2xl font-bold mb-4">{currentFilter}</h2>
//           <div className="grid justify-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
//             {groupedRestaurants[currentFilter]?.map((restaurant) => (
//               <RestaurantCard key={restaurant._id} item={restaurant} />
//             ))}
//           </div>
//           <button
//             onClick={() => setCurrentFilter(null)}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Back to Categories
//           </button>
//         </div>
//       ) : (
//         // Render default carousels
//         <>
//           {randomCategories.map(([category, restaurants]) => (
//             <div key={category} className="mb-8">
//               <h2 className="text-2xl font-bold">{category}</h2>
//               <RestaurantCarousel
//                 restaurants={restaurants}
//                 onViewAllClick={() => handleViewAllClick(category)}
//               />
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default AllRestaurants;
