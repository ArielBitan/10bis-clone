import HeroSection from "@/components/HomePage/HeroSection";
import AllRestaurants from "@/components/HomePage/AllRestaurants";
import Navbar from "@/components/layout/Navbar";
import CourierPage from "../CourierPage/CourierPage";
import CategoriesSection from "@/components/HomePage/CategoriesSection/CategoriesSection";
import RestaurantOwnerDashboard from "@/components/restaurantOwner/RestaurantOwnerDashboard";

import { useUser } from "@/components/context/userContext";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { fetchAllRestaurants } from "@/services/restaurantService";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { user, fetchUser } = useUser();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchAllRestaurants,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error loading</div>;
  if (!data) return <div>No data available</div>;
  const role = user?.role;

  return role ? (
    role === "restaurant_owner" ? (
      <div className="bg-gray-100">
        <Navbar />
        <RestaurantOwnerDashboard />
        {/* <div className="grid gap-4 mx-60 "></div> */}
      </div>
    ) : role === "courier" ? (
      <CourierPage />
    ) : (
      <div className="bg-gray-100">
        <Navbar />
        <div className="flex justify-center gap-4">
          <CategoriesSection onFilterChange={handleFilterChange} />
          <div className="flex flex-col gap-4 lg:max-w-[955px] ">
            <HeroSection />
            <AllRestaurants selectedFilters={selectedFilters} />
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="bg-gray-100 ">
      <Navbar />
      <div className="flex justify-center gap-4">
        <CategoriesSection onFilterChange={handleFilterChange} />
        <div className="flex flex-col gap-4 lg:max-w-[955px] md:max-w-[699px]">
          <HeroSection />
          <AllRestaurants selectedFilters={selectedFilters} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
