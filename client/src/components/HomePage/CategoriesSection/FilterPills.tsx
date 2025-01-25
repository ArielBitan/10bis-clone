interface FilterPillsProps {
  selectedCategory: string | undefined;
  onFilterClick: (filter: string) => void;
}
const FilterPills: React.FC<FilterPillsProps> = ({
  selectedCategory,
  onFilterClick,
}) => {
  const filters = [
    "משלוח חינם",
    "משלוח תן ביס",
    "מבצעים",
    "חדש",
    "כלים מתכלים",
    "ללא גלוטן",
    "כשר",
    "לא כשר",
    "טבעוני",
  ];

  return (
    <div className="p-4 max-w-[300px] hidden lg:block">
      <h3 className="font-bold mb-4 text-gray-800">סינון</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <div
            onClick={() => onFilterClick(filter)}
            key={index}
            className={`px-2 py-1 rounded-full text-sm border cursor-pointer ${
              selectedCategory?.includes(filter)
                ? "bg-backgroundOrange text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPills;
