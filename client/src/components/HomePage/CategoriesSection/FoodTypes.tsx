import { useState } from "react";
import { categories } from "../../../../data/categories.json";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRestaurantContext } from "@/components/context/restaurantContext";
import Loading from "@/components/Loading";

const FoodTypes = () => {
  const [showOverflow, setShowOverflow] = useState(false);

  const {
    filterRestaurants,
    restaurants,
    setFilteredRestaurants,
    availableCategories,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    isError,
  } = useRestaurantContext();

  const toggleOverflow = () => {
    setShowOverflow(!showOverflow);
  };

  const handleOnclick = (name: string) => {
    const newCategory = selectedCategory === name ? undefined : name;
    if (!newCategory) {
      setSelectedCategory(undefined);
      setFilteredRestaurants(restaurants);
      return;
    }
    setSelectedCategory(newCategory);
    filterRestaurants(newCategory);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data.</div>;

  return (
    <>
      <div
        className={` lg:overflow-hidden overflow-x-auto transition-[max-height] duration-500 ${
          showOverflow ? "lg:max-h-[1000px]" : "lg:max-h-[290px]"
        }`}
      >
        <div className="flex justify-between items-center px-4 lg:py-4">
          <h3 className="font-bold hidden lg:block">סוגי אוכל</h3>
          <button
            onClick={() => {
              setSelectedCategory("");
            }}
            className={`text-sm ${
              selectedCategory
                ? "text-blue-500 hover:underline"
                : "text-gray-200 cursor-default"
            }`}
          >
            איפוס
          </button>
        </div>
        <div className="flex overflow-x-auto categories-scroll w-screen lg:grid lg:grid-cols-3  lg:mb-8 lg:max-w-[300px] lg:overflow-y-auto">
          {categories.map((category) => {
            const isAvailable = availableCategories.includes(category.name);
            return (
              <div
                key={category.id}
                onClick={() => isAvailable && handleOnclick(category.name)}
                className={`flex flex-col items-center text-center hover:cursor-pointer group p-2
               ${
                 selectedCategory === category.name
                   ? "opacity-100"
                   : selectedCategory
                   ? "opacity-50"
                   : ""
               }
               ${isAvailable ? "" : "opacity-30 hover:cursor-default"}`}
              >
                <img
                  src={category.imageSrc}
                  alt={category.name}
                  className={`w-10 h-10 rounded-full transition-colors duration-500 ${
                    isAvailable ? "group-hover:bg-gray-200/95" : "grayscale"
                  }`}
                />
                <span
                  className={`text-sm mt-1.5 ${
                    selectedCategory === category.name
                      ? "text-orange-500 font-bold"
                      : ""
                  } ${isAvailable ? "" : "text-gray-400"}`}
                >
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sticky pt-4 lg:flex items-center justify-center hidden">
        <button
          onClick={toggleOverflow}
          className="hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          {showOverflow ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
    </>
  );
};

export default FoodTypes;
