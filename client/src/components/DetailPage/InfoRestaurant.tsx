import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IRestaurant } from "@/types/restaurantTypes";
// import { useState } from "react";
interface InfoRestaurantProps {
  item: IRestaurant;
}

const InfoRestaurant: React.FC<InfoRestaurantProps> = ({ item }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-blue-700 cursor-pointer">אודות המסעדה</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] dialog-slide w-full p-10 text-3xl text-center ">
        <div className="flex justify-end gap-4 ">
          <div>
            <h1 className="font-bold text-end text-base">{item.name}</h1>
            <p className="text-sm text-end">{item.location?.address}</p>
            <p className="text-sm text-end">{item.phone}</p>
          </div>
          <img src={item.image} alt="logo" className="w-[80px] h-[80px]" />
        </div>
        <div>
          <h2 className="font-bold mb-4">שעות פעילות</h2>
          {item.weekly_hours?.map((day) => (
            <ul
              key={item._id}
              className="flex justify-between text-base font-bold mx-4 "
            >
              <li className="list-none">
                {day.time_ranges.split(",").reverse().join(" , ")}
              </li>
              <li className="list-none">{day.day}</li>
            </ul>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoRestaurant;
