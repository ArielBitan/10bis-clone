import { useState, useEffect } from "react";
import InfoRestaurant from "@/components/DetailPage/InfoRestaurant";
import MenuCard from "@/components/MenuCard/MenuCard";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { fetchRestaurantById } from "@/services/restaurantService";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Cart from "@/components/Cart/Cart";
import { IMenuItem } from "@/types/restaurantTypes";
import RestaurantHeader from "@/components/DetailPage/RestaurantHeader";
import Loading from "@/components/Loading";
import AllReviews from "@/components/DetailPage/AllReviews";
import AvgRating from "@/components/DetailPage/AvgRating";

export interface CartItem extends IMenuItem {
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

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cartDetails, setCartDetails] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalPrice = cartDetails.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const hasItemsInCart = cartDetails.length > 0;

  useEffect(() => {
    if (data) {
      const defaultCategory = "מנות פופולריות";
      if (data.menuItems?.some((item) => item.category === defaultCategory)) {
        setSelectedCategory(defaultCategory);
      }
    }
  }, [data]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem(`cartDetails_${id}`);
    if (storedCart) {
      setCartDetails(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartDetails.length > 0) {
      sessionStorage.setItem(`cartDetails_${id}`, JSON.stringify(cartDetails));
    } else {
      sessionStorage.removeItem(`cartDetails_${id}`);
    }
  }, [cartDetails, id]);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error loading</div>;
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
  console.log(data);

  return (
    <div className="relative bg-gray-100">
      <Navbar />
      <RestaurantHeader data={data} />
      <div className="px-4 pt-8 bg-white shadow-md sm:pt-0">
        <h1 className="hidden pt-8 text-2xl font-semibold sm:block">
          {data.name}
        </h1>
        <h3 className="hidden py-2 text-sm text-gray-600 sm:block">
          <span>{data.cuisine_types.join(", ")}</span>
        </h3>
        <div className="flex gap-1 text-sm text-gray-600">
          <div className="flex gap-1">
            <FaStar className="mb-1 text-yellow-500" />
            {data._id && (
              <span>
                <AvgRating id={data._id} />
              </span>
            )}
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
          <div className="m-3 font-bold ">{`*${data.description}`}</div>
        )}
        <div className="flex ">
          <InfoRestaurant item={data} />
          <AllReviews id={id} />{" "}
          <Link
            to={`/restaurant/${id}/review`}
            state={{ backgroundLocation: location.pathname }}
          >
            <div className="mt-4 text-blue-700 cursor-pointer">
              | הוסף ביקורת
            </div>
          </Link>
        </div>
        <div className="gap-4 pb-2 lg:flex lg:items-center">
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
                className="h-4 text-sm bg-gray-100 border-none"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4 overflow-x-auto categories-scroll lg:order-1">
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
            const savedOrder = cartDetails.find(
              (order) => order.id === item._id
            );
            const initialQuantity = savedOrder ? savedOrder.quantity : 0;

            return (
              <MenuCard
                key={item._id}
                item={item}
                initialQuantity={initialQuantity}
                setCartDetails={setCartDetails}
                cartDetails={cartDetails}
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

      <div className="h-[72px]"></div>
      {hasItemsInCart && (
        <>
          <footer className="fixed bottom-0 w-full p-4 text-white bg-blue-600 cursor-pointer hover:bg-blue-700">
            <div className="flex justify-center">
              {
                <Cart
                  cartDetails={cartDetails}
                  item={data}
                  setCartDetails={setCartDetails}
                />
              }
              <div className="px-1">{`(₪${(
                Math.round(totalPrice * 10) / 10
              ).toFixed(2)})`}</div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default DetailPage;
