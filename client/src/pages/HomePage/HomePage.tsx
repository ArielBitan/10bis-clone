import HeroSection from "@/components/HomePage/HeroSection";
import AllRestaurants from "@/components/HomePage/AllRestaurants";
import Navbar from "@/components/layout/Navbar";
import CategoriesSection from "@/components/HomePage/CategoriesSection";
import { useUser } from "@/components/context/userContext";

const HomePage = () => {
  const { user } = useUser();
  console.log(user);

  return (
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
