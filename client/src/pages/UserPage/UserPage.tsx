import ActiveOrderLink from "@/components/HomePage/ActiveOrderLink";
import AllRestaurants from "@/components/HomePage/AllRestaurants";
import CategoriesSection from "@/components/HomePage/CategoriesSection/CategoriesSection";
import HeroSection from "@/components/HomePage/HeroSection";
import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const activeOrderId = localStorage.getItem("orderRoom");
  console.log(activeOrderId);
  useEffect(() => {
    const userAddress = localStorage.getItem("userAddress");
    if (!userAddress) {
      navigate("/");
    }
  }, []);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="flex lg:justify-center items-center lg:items-start lg:flex-row gap-4 pt-4 flex-col">
        <div className="lg:sticky lg:top-20 ">
          <CategoriesSection onFilterChange={handleFilterChange} />
        </div>
        <div className="flex flex-col  gap-4 lg:max-w-[955px] ">
          <HeroSection />
          <AllRestaurants
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        {activeOrderId && <ActiveOrderLink orderId={activeOrderId} />}
      </div>
    </div>
  );
};

export default UserPage;
