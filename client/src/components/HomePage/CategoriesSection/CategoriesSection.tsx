import FilterPills from "./FilterPills";
import FoodTypes from "./FoodTypes";
import SortBy from "./SortBy";

const CategoriesSection = () => {
  return (
    <div className="bg-white border border-gray-200 lg:max-h-[calc(98vh-80px)] lg:overflow-y-auto  scrollbar-hide rounded-lg shadow-sm">
      <FoodTypes />
      <FilterPills />
      <SortBy />
    </div>
  );
};

export default CategoriesSection;
