import { useRestaurantContext } from "@/components/context/restaurantContext";
import ActiveOrderLink from "@/components/HomePage/ActiveOrderLink";
import AllRestaurants from "@/components/HomePage/AllRestaurants";
import CategoriesSection from "@/components/HomePage/CategoriesSection/CategoriesSection";
import HeroSection from "@/components/HomePage/HeroSection";
import Navbar from "@/components/layout/Navbar";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const { isLoading } = useRestaurantContext();
  const navigate = useNavigate();
  const activeOrderId = localStorage.getItem("orderRoom");

  useEffect(() => {
    const userAddress = localStorage.getItem("userAddress");
    if (!userAddress) {
      navigate("/");
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-white">
      <Navbar />
      <div className="flex lg:justify-center items-center lg:items-start lg:flex-row gap-4 pt-4 flex-col lg:max-w-[1250px] mx-auto">
        <div className="lg:sticky lg:top-20 ">
          <CategoriesSection />
        </div>
        <div className="flex flex-col gap-4 lg:max-w-[955px]">
          <HeroSection />
          <AllRestaurants />
        </div>
        {activeOrderId && <ActiveOrderLink orderId={activeOrderId} />}
      </div>
    </div>
  );
};

export default UserPage;
