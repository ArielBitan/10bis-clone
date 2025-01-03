import { categories } from "../../../data/categories.json";

const CategoriesSection = () => {
  return (
    <div className=" col-start-1 row-start-1 row-span-3 ml-4 bg-white border border-gray-300">
      <div className="flex justify-between px-4 py-2">
        <h3 className="font-bold">סוגי אוכל</h3>
        <h4 className="font-extralight text-sm">איפוס</h4>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-[300px] px-8">
        {categories.map((category) => (
          <div
            key={category.id}
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
    </div>
  );
};

export default CategoriesSection;
