import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { categories } from "../../../data/categories.json";
import { searchRestaurantsByName } from "@/services/restaurantService";
import { IMenuItem, IRestaurant } from "@/types/restaurantTypes";
import { searchMenuItemsByName } from "@/services/menuItem";
import { Link } from "react-router-dom";

export interface IMenuItemWithRestaurant
  extends Omit<IMenuItem, "restaurant_id"> {
  restaurant_id: {
    _id: string;
    name: string;
    image: string;
  };
}

interface ICategory {
  id: number;
  name: string;
  imageSrc: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IMenuItemWithRestaurant[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setRestaurants([]);
      setItems([]);
      setFilteredCategories([]);
      setIsDropdownOpen(false);
      return;
    }
    setFilteredCategories(
      categories.filter((category) => category.name.includes(query))
    );
    try {
      const [restaurantResults, itemResults] = await Promise.all([
        searchRestaurantsByName(query),
        searchMenuItemsByName(query),
      ]);
      setRestaurants(restaurantResults);
      setItems(itemResults);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div className="relative flex flex-col w-full sm:w-full md:w-full lg:w-auto">
      <div className="flex items-center w-full h-8 gap-2 px-2 border border-gray-300 rounded-md hover:border-gray-500">
        <FiSearch className="hover:cursor-pointer" />
        <input
          type="text"
          placeholder="מנות, מסעדות או סוגי אוכל"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => {
            if (searchQuery.trim() === "") setIsDropdownOpen(false);
          }}
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
                  onClick={() => {
                    setSearchQuery(category.name);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="flex gap-2">
                    <div>
                      <img
                        src={category.imageSrc}
                        alt={category.name}
                        className="w-10 h-10 p-1 transition-colors duration-500 rounded-full group-hover:bg-gray-200/95"
                      />{" "}
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

          {restaurants.length > 0 && (
            <>
              <div className="px-4 py-4 text-base font-bold text-gray-700">
                מסעדות
              </div>
              <div className="border-t border-gray-200"></div>
              {restaurants.map((restaurant) => (
                <Link to={`/restaurant/${restaurant._id}`}>
                  <div
                    key={restaurant._id}
                    className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex gap-2">
                      <div>
                        <img
                          src={restaurant?.image as string}
                          alt={restaurant.name}
                          className="w-10 h-10 p-1 transition-colors duration-500 rounded-full group-hover:bg-gray-200/95"
                        />{" "}
                      </div>
                      <div>
                        <h1 className="font-normal text-black">
                          {restaurant.name}
                        </h1>
                        <p className="text-xs text-gray-600 ">
                          {restaurant.location?.address}
                        </p>
                      </div>
                    </div>{" "}
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
                <Link to={`/restaurant/${item.restaurant_id._id}`}>
                  <div
                    key={item._id}
                    className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex gap-2">
                      <div>
                        <img
                          src={item.restaurant_id.image}
                          alt={item.name}
                          className="w-10 h-10 p-1 transition-colors duration-500 rounded-full group-hover:bg-gray-200/95"
                        />
                      </div>
                      <div>
                        <h1 className="font-normal text-black">{item.name}</h1>
                        <p className="text-xs text-gray-600">
                          {item.restaurant_id.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {restaurants.length === 0 &&
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
