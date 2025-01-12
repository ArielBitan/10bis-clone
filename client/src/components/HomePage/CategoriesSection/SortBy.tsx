import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SortBy = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const filters = ["הנחה", "מרחק", "דירוג", "מינ'", "דמי משלוח", "זמן משלוח"];

  const toggleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  return (
    <div className="px-4 max-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">סידור רשימה לפי</h3>
        <button
          onClick={toggleOpenFilters}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          {openFilters ? (
            <IoIosArrowUp size={16} />
          ) : (
            <IoIosArrowDown size={16} />
          )}
        </button>
      </div>
      <div
        className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${
          openFilters ? "grid-rows-[1fr]" : ""
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2 mb-4">
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
      </div>
    </div>
  );
};

export default SortBy;
