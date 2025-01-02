import HeroSection from "@/components/HomePage/HeroSection";
import RestaurantCarousel from "@/components/HomePage/RestaurantCarousel";
import Navbar from "@/components/layout/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div>
        <HeroSection />
        <RestaurantCarousel />
      </div>
    </>
  );
};

export default HomePage;
