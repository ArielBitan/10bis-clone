import React from "react";
import { IRestaurant } from "@/types/restaurantTypes";

interface RestaurantHeaderProps {
  data: IRestaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ data }) => {
  return (
    <div className="relative w-full">
      {/* Dark background container */}
      <div className="relative w-full h-44 lg:h-72">
        {/* Background image with dark gradient overlay */}
        <img
          src={data.background_image as string}
          alt="background_image"
          className="absolute inset-0 w-full h-full object-cover "
        />

        {/* White curved overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 lg:h-52 lg:-bottom-1 bg-white"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 20%, 0 95%)",
          }}
        />

        {/* Logo container centered vertically and horizontally */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  z-10 hidden lg:block mt-6 border-4 rounded-full shadow-md">
          <img
            src={data.image as string}
            alt="logo"
            className="w-32 h-32 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
