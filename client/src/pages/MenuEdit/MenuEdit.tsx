import { useState, useEffect, useRef } from "react";
import RestaurantMenuCard from "@/components/restaurantowner/RestaurantMenuCard";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
// import { IMenuItem } from "@/types/restaurantTypes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchRestaurantById } from "@/services/restaurantService";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/context/userContext";
import { IRestaurantOwner } from "@/types/userType";
import Loading from "@/components/Loading";
import AddItem from "@/components/restaurantowner/AddItem";
import { DialogTitle } from "@radix-ui/react-dialog";

const MenuEdit = () => {
  const { user } = useUser();
  const ownedRestId = (user as IRestaurantOwner)?.owned_restaurants?.[0];

  const queryClient = useQueryClient();
  const renderFunc = () => {
    queryClient.invalidateQueries({ queryKey: ["restaurant"] });
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurant", ownedRestId],
    queryFn: () => fetchRestaurantById(ownedRestId),
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (data) {
      const defaultCategory = "מנות פופולריות";
      if (data?.menuItems?.some((item) => item.category === defaultCategory)) {
        setSelectedCategory(defaultCategory);
      }
    }
    // if (data?.menuItems) {
    // setMenu(data.menuItems ?? []);
    // }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        Error loading
        <Loading />
      </div>
    );
  if (!data) return <div>No data available</div>;

  const uniqueCategories = data?.menuItems?.reduce<string[]>(
    (categories, item) => {
      if (item.category && !categories.includes(item?.category)) {
        categories.push(item?.category);
      }
      return categories;
    },
    []
  );

  const searchedMenuItems = data?.menuItems?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (categoryRefs.current[category]) {
      categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="relative">
        <img
          src={data.background_image as string}
          alt="background_image"
          className="object-fill w-full max-h-[400px]"
          onLoad={(e) => {
            if (data.background_image instanceof File) {
              URL.revokeObjectURL((e.target as HTMLImageElement).src);
            }
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0 85%, 100% 65%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div className="absolute inset-0 items-center justify-center hidden top-2/3 md:flex">
          <img
            src={
              data.image instanceof File
                ? URL.createObjectURL(data.image)
                : data.image
            }
            alt="logo"
            className="object-cover border-4 rounded-full w-36 h-36 border-slate-100"
            onLoad={(e) => {
              if (data.image instanceof File) {
                URL.revokeObjectURL((e.target as HTMLImageElement).src);
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 px-4 mt-4">
        <h1 className="text-3xl ">עריכת תפריט המסעדה </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>הוסף פריט</Button>
          </DialogTrigger>
          <DialogTitle></DialogTitle>
          <DialogContent className="sm:max-w-[425px] bg-orangePrimary">
            <AddItem resId={data?._id || ""} onItemAdded={renderFunc} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="px-4">
        <div className="flex items-center mt-4">
          <div className="border bg-gray-100 flex items-center gap-2 px-2 w-[95%] h-12 border-gray-300 hover:border-gray-500 rounded-3xl">
            <FiSearch className="hover:cursor-pointer text-backgroundOrange " />
            <Input
              type="text"
              placeholder={`חיפוש ב${data.name}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-4 text-sm bg-gray-100 border-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 overflow-x-auto categories-scroll">
        {uniqueCategories?.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
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
        {searchedMenuItems && searchedMenuItems.length > 0 ? (
          searchedMenuItems.map((item) => (
            <div
              key={item._id}
              ref={(el) => (categoryRefs.current[item.category] = el)}
            >
              <RestaurantMenuCard item={item} renderFunc={renderFunc} />
            </div>
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

export default MenuEdit;
