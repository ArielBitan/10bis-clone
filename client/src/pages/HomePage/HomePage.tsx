import Navbar from "@/components/layout/Navbar";
import CourierPage from "../CourierPage/CourierPage";
import RestaurantOwnerDashboard from "@/components/restaurantowner/RestaurantOwnerDashboard";

import { useUser } from "@/components/context/userContext";
import { useEffect } from "react";
import UserPage from "../UserPage/UserPage";

const HomePage = () => {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);
  const role = user?.role;

  return role ? (
    role === "restaurant_owner" ? (
      <div className="bg-gray-100">
        <Navbar />
        <RestaurantOwnerDashboard />
        {/* <div className="grid gap-4 mx-60 "></div> */}
      </div>
    ) : role === "courier" ? (
      <CourierPage />
    ) : (
      <UserPage />
    )
  ) : (
    <UserPage />
  );
};

export default HomePage;
