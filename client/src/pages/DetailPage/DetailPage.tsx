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
import Cart from "@/components/Cart/Cart";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
const DetailPage = () => {
  const { id } = useParams();
  if (!id) return;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchRestaurantById(id),
  });
  const [footerTotal, setFooterTotal] = useState<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cartDetail, setCartDetail] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // useEffect(() => {
  //   const storedId = localStorage.getItem("restaurantId");

  //   if (storedId && storedId !== id) {
  //     // Clear the cart when switching restaurants
  //     localStorage.setItem("cartDetail", JSON.stringify([]));
  //   }

  //   // Update the stored restaurantId to the current restaurant
  //   localStorage.setItem("restaurantId", id);
  // }, [id]);

  const handleUpdateFooter = (price: number, meal: any, quantity: number) => {
    setFooterTotal(price);
  };

  const totalPrice = cartDetail.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const hasItemsInCart = cartDetail.length > 0;

  useEffect(() => {
    if (data) {
      const defaultCategory = "מנות פופולריות";
      if (data.menuItems?.some((item) => item.category === defaultCategory)) {
        setSelectedCategory(defaultCategory);
      }
    }
  }, [data]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartDetail");
    const storedCartDetail = localStorage.getItem("cartDetail");
    if (storedCart) {
      setCartDetail(JSON.parse(storedCart));
      if (storedCartDetail) {
        setCartDetail(JSON.parse(storedCartDetail));
      }
    }
  }, []);

  useEffect(() => {
    if (cartDetail.length > 0) {
      localStorage.setItem("cartDetail", JSON.stringify(cartDetail));
    } else {
      localStorage.removeItem("cartDetail");
    }
  }, [cartDetail]);

  useEffect(() => {
    if (cartDetail.length > 0) {
      localStorage.setItem("cartDetail", JSON.stringify(cartDetail));
    }
  }, [cartDetail]);

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error loading </div>;
  if (!data) return <div>No data available</div>;

  const uniqueCategories =
    data?.menuItems?.reduce<string[]>((categories, item) => {
      if (item.category && !categories.includes(item.category)) {
        categories.push(item.category);
      }
      return categories;
    }, []) || [];

  const searchedMenuItems = (data?.menuItems || []).filter((item) =>
    item.name.includes(searchQuery)
  );

  const filteredMenuItems = searchedMenuItems.filter((item) => {
    return selectedCategory ? item.category === selectedCategory : true;
  });

  return (
    <div className="relative bg-gray-100">
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
      <div className="px-4 bg-white shadow-md">
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
              ? `זמן משלוח כ-${data.delivery_time
                  .split("כ-")
                  .slice(1, 2)
                  .join(" - ")}`
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
        <div className="lg:flex gap-4 lg:items-center pb-2">
          <div className="flex items-center mt-4 lg:min-w-72 lg:order-2 ">
            <div className="border bg-gray-100 flex items-center gap-2  px-2 w-[95%] h-12 border-gray-300 hover:border-gray-500 rounded-3xl">
              <FiSearch className="hover:cursor-pointer text-backgroundOrange" />
              <Input
                type="text"
                placeholder={`חיפוש ב${data.name}`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCategory("");
                }}
                className="border-none h-4 text-sm bg-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto categories-scroll mt-4 lg:order-1">
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
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {filteredMenuItems.length ? (
          filteredMenuItems.map((item) => {
            const savedOrder = cartDetail.find(
              (order) => order._id === item._id
            );
            const initialQuantity = savedOrder ? savedOrder.quantity : 0;

            return (
              <MenuCard
                key={item._id}
                item={item}
                initialQuantity={initialQuantity}
                onUpdateFooter={handleUpdateFooter}
                setCartDetail={setCartDetail}
                cartDetail={cartDetail}
              />
            );
          })
        ) : (
          <div className="font-bold">
            {searchQuery
              ? `לא נמצאו תוצאות עבור "${searchQuery}"`
              : "לא נמצאו תוצאות עבור"}
          </div>
        )}
      </div>

      {hasItemsInCart && (
        <footer className="fixed bottom-0 w-full bg-blue-600 p-4 text-white hover:bg-blue-700 cursor-pointer">
          <div className="flex justify-center">
            {
              <Cart
                cartDetail={cartDetail}
                totalPrice={totalPrice}
                item={data}
                setCartDetail={setCartDetail}
              />
            }
            <div className="px-1">{`(₪${(
              Math.round(totalPrice * 10) / 10
            ).toFixed(2)})`}</div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default DetailPage;
