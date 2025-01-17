import { useState } from "react";
import { categories } from "../../../../data/categories.json";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface FoodTypesProps {
  onFilterClick: (name: string) => void;
  setSelectedFilters: (filters: string[]) => void;
}

const FoodTypes: React.FC<FoodTypesProps> = ({
  onFilterClick,
  setSelectedFilters,
}) => {
  const [showOverflow, setShowOverflow] = useState(false);

  const toggleOverflow = () => {
    setShowOverflow(!showOverflow);
  };

  const handleOnclick = (name: string) => {
    onFilterClick(name);
    setSelectedFilters([name]);
  };
  return (
    <div
      className={` lg:ml-4 lg:overflow-hidden overflow-x-auto  transition-[max-height] duration-500 ${
        showOverflow ? "lg:max-h-[1000px]" : "lg:max-h-[290px]"
      }
      `}
    >
      <div className="flex justify-between px-4 lg:py-2  ">
        <h3 className="font-bold hidden lg:block">סוגי אוכל</h3>
      </div>
      <div className="flex gap-6 overflow-x-auto categories-scroll mt-4 w-screen lg:grid lg:grid-cols-3 lg:gap-4 lg:mb-8 lg:max-w-[300px] lg:overflow-y-auto ">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleOnclick(category.name)}
            className="flex flex-col items-center text-center hover:cursor-pointer group"
          >
            <img
              src={category.imageSrc}
              alt={category.name}
              className="w-10 h-10 group-hover:bg-gray-200/95 rounded-full p-1 transition-colors duration-500"
            />
            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 lg:flex items-center justify-center hidden">
        <button
          onClick={toggleOverflow}
          className=" hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          {showOverflow ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
    </div>
  );
};

export default FoodTypes;
