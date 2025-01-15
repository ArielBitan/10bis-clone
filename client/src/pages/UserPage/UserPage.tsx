import AllRestaurants from "@/components/HomePage/AllRestaurants";
import CategoriesSection from "@/components/HomePage/CategoriesSection/CategoriesSection";
import HeroSection from "@/components/HomePage/HeroSection";
import Navbar from "@/components/layout/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userAddress = localStorage.getItem("userAddress");
    if (!userAddress) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="flex justify-center gap-4 pt-4">
        <CategoriesSection />
        <div className="flex flex-col gap-4 lg:max-w-[955px] ">
          <HeroSection />
          <AllRestaurants />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
