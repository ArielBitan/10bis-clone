import { IMenuItem } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";

interface MenuItemCardProps {
  item: IMenuItem;
  // onUpdateCart: (itemPrice: number, quantity: number, itemId: string) => void;
  initialQuantity?: number;
  onUpdateFooter: (price: number, meal: IMenuItem, quantity: number) => void;
  setCartDetail;
}
const MenuCard: React.FC<MenuItemCardProps> = ({
  item,
  // onUpdateCart,
  onUpdateFooter,
  initialQuantity,
  setCartDetail,
  cartDetail,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [cartDetail]);

  const handleIncrement = () => {
    setCartDetail((prev) => {
      const existingItemIndex = prev.findIndex(
        (order) => order._id === item._id
      );

      if (existingItemIndex !== -1) {
        // If item exists, update its quantity
        const updatedCartDetail = [...prev];
        updatedCartDetail[existingItemIndex] = {
          ...updatedCartDetail[existingItemIndex],
          quantity: (updatedCartDetail[existingItemIndex].quantity || 0) + 1, // Increment quantity or set to 1
        };
        return updatedCartDetail;
      } else {
        // If item does not exist, add it with a quantity key
        return [...prev, { ...item, quantity: 1 }];
      }
    });

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    // onUpdateCart(item.price, newQuantity, item._id);
    onUpdateFooter(item.price, item, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;

      // Update quantity in cartDetail
      setCartDetail((prev) =>
        prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );

      // Update local quantity state
      setQuantity(newQuantity);

      // Update cart and footer
      // onUpdateCart(item.price, newQuantity, item._id);
      onUpdateFooter(item.price, item, newQuantity);
    } else if (quantity === 1) {
      // Remove item from cartDetail when quantity reaches 0
      setCartDetail((prev) =>
        prev.filter((cartItem) => cartItem._id !== item._id)
      );

      setQuantity(0); // Optional: reset local quantity state

      // Update cart and footer
      // onUpdateCart(item.price, 0, item._id);
      onUpdateFooter(item.price, item, 0);
    }
  };

  return (
    <div className=" bg-white border shadow-lg flex sm:flex-row lg:flex-col my-4 mx-2 justify-between w-[97%] hover:shadow-xl hover:border-gray-300 transition duration-300 overflow-hidden">
      <div className="px-4 pt-4 flex-grow sm:w-2/3 lg:w-full">
        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        {item.description && (
          <p className="text-sm truncate md:w-3/4 max-w-56 ">
            {item.description.split(".")[0]}
          </p>
        )}
        <div className="flex justify-between items-center mt-4 lg:mb-2">
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

      <div className="">
        <img
          src={item.image}
          alt={item.name}
          className="w-[131px] lg:w-full h-[134px] object-cover sm:min-w-24 "
        />
      </div>
    </div>
  );
};

export default MenuCard;
