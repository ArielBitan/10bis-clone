import React from "react";
import { IRestaurant } from "@/types/restaurantTypes";

interface RestaurantHeaderProps {
  data: IRestaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ data }) => {
  return (
    <div className="relative w-full">
      {/* Dark background container */}
      <div className="relative w-full h-48 bg-gray-900">
        {/* Background image with dark gradient overlay */}
        <img
          src={data.background_image as string}
          alt="background_image"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* White curved overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-white"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 30%, 0 100%)",
          }}
        />

        {/* Logo container centered vertically and horizontally */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  z-10">
          <img
            src={data.image as string}
            alt="logo"
            className="w-32 h-32 rounded-full shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
