import { useUser } from "@/components/context/userContext";
import { fetchRestaurantById } from "@/services/restaurantService";
import { IRestaurant } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";

const MenuEdit = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const fetchedRestaurant = await fetchRestaurantById(
          //   user?.owned_restaurants[0]
          "6776fdb5d1030347fd0fabd7"
        );
        setRestaurant(fetchedRestaurant);
        console.log(fetchedRestaurant);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    getRestaurant();
  }, []);

  return (
    <div>
      <div className="relative">
        <img
          src={restaurant?.background_image}
          alt="background_image"
          className="object-cover w-full h-auto"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0 85%, 100% 65%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center top-3/4">
          <img
            src={restaurant?.image}
            alt="logo"
            className="object-cover border-4 rounded-full w-36 h-36 border-slate-100"
          />
          <div className="p-3 text-3xl font-bold shadow-sm ">
            {" "}
            {restaurant?.name}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuEdit;
