import { useState } from "react";

import { IRestaurant } from "@/types/restaurantTypes";
import RestaurantCard from "../RestaurantCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface RestaurantCarouselProps {
  restaurants: IRestaurant[];
  onViewAllClick: () => void;
}

const RestaurantCarousel: React.FC<RestaurantCarouselProps> = ({
  restaurants,
  onViewAllClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;

  // Calculate how many slides can be displayed
  const maxSlides = Math.ceil(restaurants.length / itemsPerSlide);

  const nextSlide = () => {
    if (currentSlide < maxSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="relative py-8">
      <div className=" flex gap-2 justify-end px-4 py-2 z-10 ">
        <button
          onClick={prevSlide}
          className="absolute top-0 left-14 p-2 bg-slate-50 rounded-full shadow-md h-10 w-10 border border-black"
        >
          <IoIosArrowForward size={24} />
        </button>
        <button
          onClick={nextSlide}
          className=" absolute top-0 left-0 p-2 bg-slate-50 rounded-full shadow-md h-10 w-10 border border-black"
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          onClick={onViewAllClick}
          className=" absolute top-0 left-28 p-2 bg-white rounded-full shadow-md h-10 w-16 border border-slate-400"
        >
          עוד
        </button>
      </div>
      <div className="overflow-hidden">
        <div
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          className="flex gap-4 transition-transform duration-500"
        >
          {restaurants
            .slice(currentSlide * 3, currentSlide * 3 + 3)
            .map((restaurant) => (
              <RestaurantCard key={restaurant._id} item={restaurant} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCarousel;
