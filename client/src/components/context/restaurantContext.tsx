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
import { useNavigate } from "react-router-dom";

interface RestaurantContextType {
  restaurants: IRestaurant[];
  filteredRestaurants: IRestaurant[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  setFilteredRestaurants: (restaurants: IRestaurant[]) => void;
  setSelectedCategory: (category: string | undefined) => void;
  filterRestaurants: (filter: string) => void;
  refetchRestaurants: () => void;
  availableCategories: string[];
  selectedCategory: string | undefined;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const address = localStorage.getItem("userAddress");
  const [localAddress, setLocalAddress] = useState(address);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAddress = () => {
      const currentAddress = localStorage.getItem("userAddress");
      if (currentAddress !== localAddress) {
        setLocalAddress(currentAddress);
        if (!currentAddress) {
          navigate("/");
        }
      }
    };
    checkAddress();
    const interval = setInterval(checkAddress, 1000);
    return () => clearInterval(interval);
  }, [localAddress, navigate]);

  const {
    data: restaurants = [],
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["restaurants", localAddress],
    queryFn: fetchAllRestaurants,
    enabled: !!localAddress,
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>();
  useEffect(() => {
    if (isSuccess && restaurants.length > 0) {
      setFilteredRestaurants(restaurants);
      getAvailableCategories();
    }
  }, [isSuccess, restaurants]);

  const refetchRestaurants = () => {
    refetch();
  };

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
        isSuccess,
        filterRestaurants,
        refetchRestaurants,
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
