import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { categories } from "../../../data/categories.json";
import { IMenuItem, IRestaurant } from "@/types/restaurantTypes";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "../context/restaurantContext";

interface SearchMenuItem extends Omit<IMenuItem, "restaurant_id"> {
  restaurant: IRestaurant;
}

interface ICategory {
  id: number;
  name: string;
  imageSrc: string;
}

const Search = () => {
  const { restaurants, setSelectedCategory } = useRestaurantContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(
    categories.slice(0, 2)
  );

  const [items, setItems] = useState<(SearchMenuItem | undefined)[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>(
    restaurants.slice(0, 3)
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCategories(categories.slice(0, 2));
      setFilteredRestaurants(restaurants.slice(0, 2));
      setItems([]);
      return;
    }
    setFilteredCategories(
      categories.filter((category) => category.name.includes(query))
    );
    setFilteredRestaurants(
      restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setItems(
      restaurants
        .flatMap((restaurant) =>
          restaurant.menuItems?.map((item) => ({
            ...item,
            restaurant: restaurant,
          }))
        )
        .filter(
          (item) =>
            item &&
            item.name &&
            item.name.toLowerCase().includes(query.toLowerCase())
        )
    );
  };

  const handleCategoryClick = (category: ICategory) => {
    setSelectedCategory(category.name);
    setSearchQuery(category.name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex flex-col w-full sm:w-full md:w-full lg:w-[300px]">
      <div className="flex items-center w-full h-8 gap-2 px-2 border border-gray-300 hover:border-gray-500">
        <FiSearch className="hover:cursor-pointer" />
        <input
          type="text"
          placeholder="מנות, מסעדות או סוגי אוכל"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          className="text-sm h-[24px] border-none focus:outline-none focus:ring-0 w-full"
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-8 bg-white border border-gray-300 rounded-md shadow-lg h-[50vh] overflow-y-auto text-textBlackSecondary">
          {filteredCategories.length > 0 && (
            <>
              <div className="px-4 py-4 text-base font-bold text-gray-700">
                סוגי מטבח
              </div>
              <div className="border-t border-gray-200"></div>
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="flex gap-2">
                    <div>
                      <img
                        src={category.imageSrc}
                        alt={category.name}
                        className="w-10 h-10 p-1 transition-colors duration-500 rounded-full group-hover:bg-gray-200/95"
                      />
                    </div>
                    <div>
                      <h1 className="font-normal text-black">
                        {category.name}
                      </h1>
                      <p className="text-xs text-gray-600">סוג מטבח</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200"></div>
            </>
          )}

          {filteredRestaurants.length > 0 && (
            <>
              <div className="px-4 py-4 text-base font-bold text-gray-700">
                מסעדות
              </div>
              <div className="border-t border-gray-200"></div>
              {filteredRestaurants.map((restaurant) => (
                <Link
                  key={restaurant._id}
                  to={`/restaurant/${restaurant._id}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100">
                    <div className="flex gap-2">
                      <div>
                        <img
                          src={restaurant?.image as string}
                          alt={restaurant.name}
                          className="w-10 h-10 p-1 transition-colors duration-500 rounded-full group-hover:bg-gray-200/95"
                        />
                      </div>
                      <div>
                        <h1 className="font-normal text-black">
                          {restaurant.name}
                        </h1>
                        <p className="text-xs text-gray-600">
                          {restaurant.location?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {items.length > 0 && (
            <>
              <div className="px-4 py-4 text-base font-bold text-gray-700">
                מנות
              </div>
              <div className="border-t border-gray-200"></div>
              {items.map((item) => (
                <Link
                  key={item?._id}
                  to={`/restaurant/${item?.restaurant?._id}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100">
                    <div className="flex gap-2">
                      <div>
                        <img
                          src={item?.restaurant.image as string}
                          alt={item?.name}
                          className="w-10 h-10 p-1 transition-colors duration-500 rounded-full group-hover:bg-gray-200/95"
                        />
                      </div>
                      <div>
                        <h1 className="font-normal text-black">{item?.name}</h1>
                        <p className="text-xs text-gray-600">
                          {item?.restaurant?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {filteredRestaurants.length === 0 &&
            filteredCategories.length === 0 &&
            items.length === 0 && (
              <div className="px-4 py-2 text-sm text-center text-gray-500">
                לא נמצאו תוצאות
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Search;
