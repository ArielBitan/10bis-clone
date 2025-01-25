import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { slides } from "../../../data/carousel.json";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" relative flex flex-col w-full max-w-[955px] h-[21rem] col-span-4 row-start-1 mb-8 overflow-hidden rounded-2xl">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative flex flex-col-reverse lg:flex-row shadow-sm rounded-2xl">
                <div className="flex-2 lg:w-3/5">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover w-full h-full rounded-br-2xl"
                  />
                </div>
                <div className="flex-1 lg:w-1/3 flex flex-col justify-center p-8 bg-white bg-opacity-75 h-72 rounded-2xl">
                  <h2 className="mb-4 text-3xl font-bold text-right">
                    {slide.title}
                  </h2>
                  <p className="text-right text-gray-600">{slide.desc}</p>
                </div>
                <div className="absolute flex gap-2 bottom-4 left-4">
                  <button
                    onClick={nextSlide}
                    className="p-2 text-gray-600 cursor-pointer"
                  >
                    <IoIosArrowForward size={24} />
                  </button>
                  <button
                    onClick={prevSlide}
                    className="p-2 text-gray-600 cursor-pointer"
                  >
                    <IoIosArrowBack size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute flex justify-center gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
