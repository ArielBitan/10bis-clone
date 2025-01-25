import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IRestaurant } from "@/types/restaurantTypes";
import { fetchAllRestaurants } from "@/services/restaurantService";
import { useQuery } from "@tanstack/react-query";

interface RestaurantContextType {
  restaurants: IRestaurant[];
  filteredRestaurants: IRestaurant[];
  isLoading: boolean;
  isError: boolean;
  setFilteredRestaurants: (restaurants: IRestaurant[]) => void;
  setSelectedCategory: (category: string | undefined) => void;
  filterRestaurants: (filter: string) => void;
  availableCategories: string[];
  selectedCategory: string | undefined;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: restaurants = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchAllRestaurants,
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>();

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    setFilteredRestaurants(restaurants);
    getAvailableCategories();
  }, [isSuccess]);

  const filterRestaurants = (filter: string) => {
    const filtered = restaurants.filter((r) =>
      r.cuisine_types.includes(filter)
    );
    setFilteredRestaurants(filtered);
    setSelectedCategory(filter);
    getAvailableCategories();
  };

  // Function to get unique categories from restaurant data
  const getAvailableCategories = () => {
    const categories = new Set<string>();
    restaurants.forEach((restaurant) => {
      restaurant.cuisine_types.forEach((type) => categories.add(type));
    });
    setAvailableCategories(Array.from(categories));
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        availableCategories,
        setSelectedCategory,
        selectedCategory,
        filterRestaurants,
        filteredRestaurants,
        isLoading,
        isError,
        setFilteredRestaurants,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context)
    throw new Error(
      "useRestaurantContext must be used within a RestaurantProvider"
    );
  return context;
};
