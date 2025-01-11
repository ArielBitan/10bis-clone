import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { slides } from "../../../data/carousel.json";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-64 mb-8 col-span-4 row-start-1">
      <div className="relative">
        {/* Slides container */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full relative bg-white overflow-hidden"
            >
              <div className="flex">
                {/* Image */}
                <div className="flex-1">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover"
                  />
                </div>
                {/* Text content */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4 text-right">
                    {slide.title}
                  </h2>
                  <p className="text-right text-gray-600">{slide.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="absolute bottom-0 left-0 flex flex-row-reverse gap-8 p-3">
          <button onClick={nextSlide}>
            <IoIosArrowBack size={16} />
          </button>
          <button onClick={prevSlide}>
            <IoIosArrowForward size={16} />
          </button>
        </div>
      </div>
      {/* Pagination dots */}
      <div className="flex gap-2 justify-center my-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
