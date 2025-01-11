import FilterPills from "./FilterPills";
import FoodTypes from "./FoodTypes";
import SortBy from "./SortBy";

const CategoriesSection = () => {
  return (
    <div className="col-start-1 row-start-1 row-span-3">
      <div className="bg-white border border-gray-300 sticky top-20 max-h-[calc(98vh-80px)] overflow-y-auto px-2 scrollbar-hide max-w-[275px]">
        <FoodTypes />
        <FilterPills />
        <SortBy />
      </div>
    </div>
  );
};

export default CategoriesSection;
