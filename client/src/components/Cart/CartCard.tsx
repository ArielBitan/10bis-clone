import { IMenuItem } from "@/types/restaurantTypes";
// import { useState } from "react";

interface ItemCardProps {
  item: IMenuItem;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}
const CartCard: React.FC<ItemCardProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  //   const handleIncrement = () => {
  //     setCartDetail((prev) => {
  //       const updatedCart = prev.map((cartItem) =>
  //         cartItem._id === item._id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       );
  //       localStorage.setItem("cartDetail", JSON.stringify(updatedCart)); // Persist to localStorage
  //       return updatedCart;
  //     });

  //     onUpdateFooter(item.price, item, item.quantity + 1); // Update the footer with the new quantity
  //   };

  //   const handleDecrement = () => {
  //     if (item.quantity > 1) {
  //       setCartDetail((prev) => {
  //         const updatedCart = prev.map((cartItem) =>
  //           cartItem._id === item._id
  //             ? { ...cartItem, quantity: cartItem.quantity - 1 }
  //             : cartItem
  //         );
  //         localStorage.setItem("cartDetail", JSON.stringify(updatedCart)); // Persist to localStorage
  //         return updatedCart;
  //       });

  //       onUpdateFooter(item.price, item, item.quantity - 1); // Update the footer with the new quantity
  //     } else if (item.quantity === 1) {
  //       // Remove item from the cart
  //       setCartDetail((prev) => {
  //         const updatedCart = prev.filter(
  //           (cartItem) => cartItem._id !== item._id
  //         );
  //         localStorage.setItem("cartDetail", JSON.stringify(updatedCart)); // Persist to localStorage
  //         return updatedCart;
  //       });

  //       removeItem(item._id); // Optionally notify parent about item removal
  //       onUpdateFooter(item.price, item, 0); // Update the footer
  //     }
  //   };

  return (
    <div className=" bg-white flex sm:flex-row mx-2 justify-between w-[97%] overflow-hidden">
      <div className="px-4  flex-grow sm:w-2/3 flex flex-col justify-between">
        <h3 className="font-bold text-lg">{item.name}</h3>
        {/* {item.description && (
          <p className="text-sm truncate md:w-3/4 max-w-56 ">
            {item.description.split(".")[0]}
          </p>
        )} */}
        <div className="flex justify-between items-center mt-4 ">
          <div className="mt-2 text-base font-semibold">{`₪${(
            Math.round((item.price || 0) * 10) / 10
          ).toFixed(2)}`}</div>

          <div className="flex items-center justify-between flex-row-reverse border border-gray-300 rounded-full px-4  h-10 w-24">
            <button
              onClick={() => onIncrement(item._id)}
              className="text-blue-600 text-xl "
            >
              +
            </button>
            <span className="text-lg font-semibold">{item.quantity}</span>
            <button
              onClick={() => onDecrement(item._id)}
              className="text-gray-300 text-4xl"
            >
              -
            </button>
          </div>
          <div></div>
        </div>
      </div>

      <div className="">
        <img
          src={item.image}
          alt={item.name}
          className="w-[105px]  h-[107px] object-cover sm:min-w-24 "
        />
        <button
          onClick={() => onRemove(item._id)}
          className=" text-blue-500 p-2 text-lg"
        >
          הסרה
        </button>
      </div>
    </div>
  );
};

export default CartCard;
