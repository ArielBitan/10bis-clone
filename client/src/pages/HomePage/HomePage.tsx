import Navbar from "@/components/layout/Navbar";
import CourierPage from "../CourierPage/CourierPage";
import RestaurantOwnerDashboard from "@/components/restaurantowner/RestaurantOwnerDashboard";

import { useUser } from "@/components/context/userContext";
import { useEffect } from "react";
import UserPage from "../UserPage/UserPage";
import AllChats from "@/components/AllChats/AllChats";

const HomePage = () => {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);
  const role = user?.role;

  return (
    <div className="bg-gray-100">
      {role ? (
        role === "restaurant_owner" ? (
          <div>
            <Navbar />
            <RestaurantOwnerDashboard />
          </div>
        ) : role === "courier" ? (
          <CourierPage />
        ) : (
          <UserPage />
        )
      ) : (
        <UserPage />
      )}
      <AllChats />
    </div>
  );
};

export default HomePage;
