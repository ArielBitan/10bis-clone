import { useState } from "react";
import FilterPills from "./FilterPills";
import FoodTypes from "./FoodTypes";
import SortBy from "./SortBy";

interface CategoriesSectionProps {
  onFilterChange: (filters: string[]) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onFilterChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const handleFilterClick = (filter: string) => {
    setSelectedCategory(filter);
    onFilterChange(filter ? [filter] : []);
  };

  return (
    <div className="bg-white border border-gray-200 lg:max-h-[calc(98vh-80px)] lg:overflow-y-auto  scrollbar-hide rounded-lg shadow-sm">
      <FoodTypes
        onFilterClick={handleFilterClick}
        setSelectedCategory={setSelectedCategory}
      />
      <FilterPills
        selectedCategory={selectedCategory}
        onFilterClick={handleFilterClick}
      />
      <SortBy />
    </div>
  );
};

export default CategoriesSection;
