const FilterPills = () => {
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
    <div className="p-4 max-w-[300px]">
      <h3 className="font-bold mb-4 text-gray-800">סינון</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="px-2 py-1 rounded-full bg-gray-100 text-sm border border-gray-200 hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPills;
