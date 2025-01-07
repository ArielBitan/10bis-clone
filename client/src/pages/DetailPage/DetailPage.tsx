import { useState, useEffect } from "react";
import InfoRestaurant from "@/components/DetailPage/InfoRestaurant";
import MenuCard from "@/components/MenuCard/MenuCard";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { fetchRestaurantById } from "@/services/restaurantService";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  if (!id) return;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => fetchRestaurantById(id),
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (data) {
      const defaultCategory = "מנות פופולריות";
      if (data.menuItems.some((item) => item.category === defaultCategory)) {
        setSelectedCategory(defaultCategory);
      }
    }
  }, [data]);

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error loading </div>;
  if (!data) return <div>No data available</div>;

  const uniqueCategories = data.menuItems.reduce((categories, item) => {
    if (item.category && !categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  const searchedMenuItems = data.menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <Navbar />
      <div className="relative">
        <img
          src={data.background_image}
          alt="background_image"
          className="w-full h-auto object-cover"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0 85%, 100% 65%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div className="absolute inset-0 top-2/3 items-center justify-center hidden md:flex">
          <img
            src={data.image}
            alt="logo"
            className="w-36 h-36 rounded-full object-cover border-4 border-slate-100"
          />
        </div>
      </div>
      <div className="px-4">
        <div className="flex gap-1 datas-center text-sm ">
          <div className="flex datas-center gap-1">
            <FaStar className="text-yellow-500 mb-1" />
            <span>0</span>
          </div>
          <span>•</span>
          <span>{`משלוח ₪${data.delivery_fee || 0}`}</span>
          <span>•</span>
          <span>
            {data.delivery_time
              ? data.delivery_time.split("כ-").slice(1, 2).join(" - ")
              : ""}
          </span>{" "}
          <span>•</span>
          <div className="mb-2 text-sm">
            <span>{`מינימום הזמנה  ₪${data.min_order || 0}`}</span>
          </div>
        </div>
        {data.description && (
          <div className=" m-3 font-bold">{`*${data.description}`}</div>
        )}
        <InfoRestaurant item={data} />
        <div className="flex items-center mt-4">
          <div className="border bg-gray-100 flex items-center gap-2 px-2 w-[95%] h-12 border-gray-300 hover:border-gray-500 rounded-3xl">
            <FiSearch className="hover:cursor-pointer text-backgroundOrange " />
            <Input
              type="text"
              placeholder={`חיפוש ב${data.name}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none h-4 text-sm bg-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto categories-scroll mt-4">
        {uniqueCategories.map((category) => (
          <div
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-sm px-3 py-1 whitespace-nowrap cursor-pointer ${
              selectedCategory === category
                ? "border-b-2 border-backgroundOrange font-bold"
                : ""
            }`}
          >
            {category}
          </div>
        ))}
      </div>

      <div>
        {searchedMenuItems.length > 0 ? (
          searchedMenuItems.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))
        ) : (
          <div className="font-bold">
            {searchQuery
              ? `לא נמצאו תוצאות עבור "${searchQuery}"`
              : "לא נמצאו תוצאות עבור"}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
