import HeroSection from "@/components/HomePage/HeroSection";
import AllRestaurants from "@/components/HomePage/AllRestaurants";
import Navbar from "@/components/layout/Navbar";
import CourierPage from "../CourierPage/CourierPage";
import CategoriesSection from "@/components/HomePage/CategoriesSection/CategoriesSection";
import RestaurantOwnerDashboard from "@/components/restaurantOwner/RestaurantOwnerDashboard";

import { useUser } from "@/components/context/userContext";
import { useEffect } from "react";

const HomePage = () => {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

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
      <div className="bg-gray-100 ">
        <Navbar />
        <div className="flex justify-center gap-4">
          <CategoriesSection />
          <div className="flex flex-col gap-4 lg:max-w-[955px] ">
            <HeroSection />
            <AllRestaurants />
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="bg-gray-100 ">
      <Navbar />
      <div className="flex justify-center gap-4">
        <CategoriesSection />
        <div className="flex flex-col gap-4 lg:max-w-[955px] md:max-w-[699px]">
          <HeroSection />
          <AllRestaurants />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
