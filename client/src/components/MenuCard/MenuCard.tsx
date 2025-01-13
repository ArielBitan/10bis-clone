import { CartItem } from "@/pages/DetailPage/DetailPage";
import { IMenuItem } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";

interface MenuItemCardProps {
  item: IMenuItem;
  initialQuantity?: number;
  onUpdateFooter: (price: number, meal: IMenuItem, quantity: number) => void;
  setCartDetails: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartDetails: CartItem[];
}

const MenuCard: React.FC<MenuItemCardProps> = ({
  item,
  onUpdateFooter,
  initialQuantity = 0,
  setCartDetails,
  cartDetails,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    const cartItem = cartDetails.find((cartItem) => cartItem.id === item._id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartDetails, item._id]);

  const handleIncrement = () => {
    const existingItemIndex = cartDetails.findIndex(
      (order) => order.id === item._id
    );

    if (existingItemIndex !== -1) {
      const updatedCartDetails = [...cartDetails];
      updatedCartDetails[existingItemIndex] = {
        ...updatedCartDetails[existingItemIndex],
        quantity: updatedCartDetails[existingItemIndex].quantity + 1,
      };
      setCartDetails(updatedCartDetails);
    } else {
      setCartDetails([
        ...cartDetails,
        { ...item, id: item._id as string, quantity: 1 },
      ]);
    }

    setQuantity((prevQuantity) => prevQuantity + 1);
    onUpdateFooter(item.price, item, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setCartDetails((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item._id
            ? { ...cartItem, quantity: updatedQuantity }
            : cartItem
        )
      );
      setQuantity(updatedQuantity);
      onUpdateFooter(item.price, item, updatedQuantity);
    } else if (quantity === 1) {
      setCartDetails((prev) =>
        prev.filter((cartItem) => cartItem.id !== item._id)
      );
      setQuantity(0);
      onUpdateFooter(item.price, item, 0);
    }
  };

  return (
    <div className="bg-white border shadow-lg flex sm:flex-row my-4 mx-2  hover:shadow-xl hover:border-gray-300 transition duration-300 overflow-hidden">
      <div className="px-4 pt-4 flex flex-col flex-grow justify-between">
        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        {item.description && (
          <p className="text-sm truncate md:w-3/4 max-w-56 ">
            {item.description.split(".")[0]}
          </p>
        )}
        <div className="flex justify-between items-center mb-2">
          <div className="mt-2 text-base font-semibold">{`₪${
            Number.isInteger(item.price)
              ? item.price
              : (Math.round((item.price || 0) * 10) / 10).toFixed(2)
          }`}</div>

          <div className="flex items-center justify-between flex-row-reverse border border-gray-300 rounded-full px-4  h-10 w-24">
            <button
              onClick={handleDecrement}
              className="text-gray-300 text-4xl"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="text-blue-600 text-xl "
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="w-[150px] h-[150px]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full object-cover sm:min-w-24 "
        />
      </div>
    </div>
  );
};

export default MenuCard;
