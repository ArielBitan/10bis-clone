import { useState, useEffect, useRef } from "react";
import RestaurantMenuCard from "@/components/restaurantowner/RestaurantMenuCard";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
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

  // Group items by category
  const groupedMenuItems = data.menuItems?.reduce<{ [key: string]: any[] }>(
    (acc, item) => {
      if (item.category) {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
      }
      return acc;
    },
    {}
  );

  const uniqueCategories = Object.keys(groupedMenuItems as object);

  // const searchedMenuItems = Object.values(groupedMenuItems as object)
  //   .flat()
  //   .filter((item) =>
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (categoryRefs.current[category]) {
      categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-gray-50">
      <Navbar />
      <div className="relative">
        <img
          src={data.background_image as string}
          alt="background_image"
          className="object-cover w-full max-h-[400px]"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0 85%, 100% 65%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div className="absolute inset-0 items-center justify-center hidden top-2/3 md:flex">
          <img
            src={data.image as string}
            alt="logo"
            className="object-cover border-4 rounded-full w-36 h-36 border-slate-100"
          />
        </div>
      </div>
      <div className="text-center mt-8 px-4">
        <h1 className="text-3xl font-semibold">עריכת תפריט המסעדה</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">הוסף פריט</Button>
          </DialogTrigger>
          <DialogTitle></DialogTitle>
          <DialogContent className="sm:max-w-[425px] bg-orangePrimary">
            <AddItem resId={data?._id || ""} onItemAdded={renderFunc} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-6 mt-6 overflow-x-auto px-4">
        {uniqueCategories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`text-sm px-3 py-2 cursor-pointer rounded-xl whitespace-nowrap ${
              selectedCategory === category
                ? "border-b-2 border-backgroundOrange font-semibold"
                : "hover:bg-gray-200"
            }`}
          >
            {category}
          </div>
        ))}
        <div className="border bg-gray-100 flex items-center gap-2 px-4 py-2 w-full md:w-3/4 rounded-3xl">
          <FiSearch className="text-backgroundOrange" />
          <Input
            type="text"
            placeholder={`חיפוש ב${data.name}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 text-sm bg-gray-100 border-none"
          />
        </div>
      </div>

      <div className="mt-8 px-4">
        {uniqueCategories.map((category) => (
          <div
            key={category}
            ref={(el) => (categoryRefs.current[category] = el)}
          >
            {searchQuery !== "" || (
              <h2 className="text-xl font-semibold my-6">{category}</h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedMenuItems &&
                groupedMenuItems[category]
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <div key={item._id}>
                      <RestaurantMenuCard item={item} renderFunc={renderFunc} />
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuEdit;
