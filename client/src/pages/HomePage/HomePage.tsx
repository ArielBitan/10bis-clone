import HeroSection from "@/components/HomePage/HeroSection";
import AllRestaurants from "@/components/HomePage/AllRestaurants";
import Navbar from "@/components/layout/Navbar";
import CategoriesSection from "@/components/HomePage/CategoriesSection";
import { useUser } from "@/components/context/userContext";
import RestaurantOwnerDashboard from "@/components/restaurantOwner/RestaurantOwnerDashboard";
import { useEffect } from "react";
import CourierPage from "../CourierPage/CourierPage";

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
        <div className="grid gap-4 mx-60 "></div>
      </div>
    ) : role === "courier" ? (
      <CourierPage />
    ) : (
      <div className="bg-gray-100">
        <Navbar />
        <div className="grid gap-4 mx-60">
          <HeroSection />
          <CategoriesSection />
          <AllRestaurants />
        </div>
      </div>
    )
  ) : (
    <div className="bg-gray-100">
      <Navbar />
      <div className="grid gap-4 mx-60 ">
        <HeroSection />
        <CategoriesSection />
        <AllRestaurants />
      </div>
    </div>
  );
};

export default HomePage;
