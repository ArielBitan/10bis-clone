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
    <div className="bg-white border border-gray-300 lg:max-h-[calc(98vh-80px)] lg:overflow-y-auto px-2 scrollbar-hide">
      <div className="col-start-1 row-start-1 row-span-3  ">
        <div className="text-left mx-4">
          <button
            onClick={() => {
              setSelectedFilters([]);
              onFilterChange([]);
            }}
            className="text-sm text-blue-500 hover:underline pt-4 mr-2"
          >
            איפוס
          </button>
        </div>
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
