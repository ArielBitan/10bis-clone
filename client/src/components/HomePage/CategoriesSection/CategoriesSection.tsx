import { useState } from "react";
import FilterPills from "./FilterPills";
import FoodTypes from "./FoodTypes";
import SortBy from "./SortBy";

interface CategoriesSectionProps {
  onFilterChange: (filters: string[]) => void; // Type for onFilterChange function
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onFilterChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterClick = (filter: string) => {
    let updatedFilters: string[];
    if (selectedFilters.includes(filter)) {
      updatedFilters = selectedFilters.filter((f) => f !== filter);
    } else {
      updatedFilters = [filter];
    }

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white border border-gray-300 sticky top-20 max-h-[calc(98vh-80px)] overflow-y-auto px-2 scrollbar-hide max-w-[275px] hidden lg:block">
      <div className="col-start-1 row-start-1 row-span-3 ">
        <button
          onClick={() => {
            setSelectedFilters([]);
            onFilterChange([]);
          }}
          className="text-sm text-blue-500 hover:underline mr-52 pt-4"
        >
          איפוס
        </button>
        <FoodTypes
          onFilterClick={handleFilterClick}
          setSelectedFilters={setSelectedFilters}
        />
        <FilterPills
          selectedFilters={selectedFilters}
          onFilterClick={handleFilterClick}
        />
        <SortBy />
      </div>
    </div>
  );
};

export default CategoriesSection;
