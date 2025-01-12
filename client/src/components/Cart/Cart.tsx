// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { IRestaurant } from "@/types/restaurantTypes";
// import CartCard from "./CartCard";
// import { useEffect, useState } from "react";

// interface InfoCartProps {
//   item: IRestaurant;
//   cartDetail: IRestaurant[];
//   totalPrice: number;
// }
// const Cart: React.FC<InfoCartProps> = ({ item, cartDetail, totalPrice }) => {
//   const [cartItems, setCartItems] = useState();
//   const deliveryFee = parseFloat(item.delivery_fee as string) || 0;
//   const totalSum = totalPrice + deliveryFee;

//   const removeItemFromCart = (itemId: string) => {
//     // setCartItems(cartDetail.filter((cartItem) => cartItem._id !== itemId));
//   };

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cartDetail");
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, [cartDetail]);

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <div className="font-bold bg-transparent">מעבר לעגלה </div>
//       </DialogTrigger>
//       <DialogContent className=" border-none sm:max-w-[700px] dialog-slide w-full max-h-[80vh] overflow-y-auto text-3xl text-center ">
//         <div className=" p-4 flex justify-end items-center gap-4 bg-backgroundOrange text-white">
//           <h1 className="font-bold text-end text-base">{item.name}</h1>
//           <img
//             src={item.image}
//             alt="logo"
//             className="w-[50px] h-[50px] object-cover rounded-full"
//           />
//         </div>

//         <div className="px-8 py-2">
//           {cartDetail.map((cartItem) => {
//             return (
//               <div key={cartItem._id} className="my-2">
//                 <CartCard item={cartItem} removeItem={removeItemFromCart} />
//                 <hr className="my-2" />
//               </div>
//             );
//           })}
//           <div className="text-lg mb-2">
//             <div className=" flex justify-between">
//               {" "}
//               <span>{`₪${totalPrice.toFixed(2)}`}</span>
//               <div>סך מחיר הפריטים </div>
//             </div>
//             <div className=" flex justify-between">
//               {" "}
//               <span>{`₪${item.delivery_fee || 0}`}</span>
//               <div>דמי משלוח</div>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between font-bold">
//               <span>{`₪${totalSum.toFixed(2)}`}</span>
//               <div>סך כל ההזמנה</div>
//             </div>
//           </div>
//         </div>
//         <div className="w-full bg-blue-600 p-4 text-white font-bold text-lg hover:bg-blue-700 cursor-pointer">
//           לעמוד התשלום
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Cart;
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IRestaurant } from "@/types/restaurantTypes";
import CartCard from "./CartCard";
import { useState, useEffect } from "react";

interface InfoCartProps {
  item: IRestaurant;
}

const Cart: React.FC<InfoCartProps> = ({ item, cartDetail, setCartDetail }) => {
  // Initialize cart state from localStorage if available
  //   const [cartDetail, setCartDetail] = useState<IRestaurant[]>(() => {
  //     const savedCart = localStorage.getItem("cartDetail");
  //     return savedCart ? JSON.parse(savedCart) : [];
  //   });

  // Calculate total price
  const totalPrice = cartDetail.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );
  const deliveryFee = parseFloat(item.delivery_fee as string) || 0;
  const totalSum = totalPrice + deliveryFee;

  // Handle incrementing the quantity of an item
  const handleIncrement = (itemId: string) => {
    const updatedCart = cartDetail.map((cartItem) =>
      cartItem._id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartDetail(updatedCart);
    localStorage.setItem("cartDetail", JSON.stringify(updatedCart));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (itemId: string) => {
    const updatedCart = cartDetail
      .map((cartItem) =>
        cartItem._id === itemId
          ? {
              ...cartItem,
              quantity: Math.max(0, cartItem.quantity - 1),
            }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0); // Remove items with 0 quantity
    setCartDetail(updatedCart);
    localStorage.setItem("cartDetail", JSON.stringify(updatedCart));
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartDetail.filter(
      (cartItem) => cartItem._id !== itemId
    );
    setCartDetail(updatedCart);
    localStorage.setItem("cartDetail", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    localStorage.setItem("cartDetail", JSON.stringify(cartDetail)); // Sync cart with localStorage
  }, [cartDetail]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="font-bold bg-transparent">מעבר לעגלה</div>
      </DialogTrigger>
      <DialogContent className="border-none sm:max-w-[700px] dialog-slide w-full max-h-[80vh] overflow-y-auto text-3xl text-center">
        <div className="p-3 flex justify-end items-center gap-4 bg-backgroundOrange text-white">
          <h1 className="font-bold text-end text-base">{item.name}</h1>
          <img
            src={item.image}
            alt="logo"
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
        </div>

        <div className="px-8 py-2">
          {cartDetail.map((cartItem) => (
            <div key={cartItem._id} className="my-2">
              <CartCard
                item={cartItem}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemoveItem}
              />
              <hr className="my-2" />
            </div>
          ))}

          <div className="text-lg mb-2">
            <div className="flex justify-between">
              <span>{`₪${(Math.round(totalPrice * 10) / 10).toFixed(2)}`}</span>
              <div>סך מחיר הפריטים</div>
            </div>
            <div className="flex justify-between">
              <span>{`₪${deliveryFee || 0}`}</span>
              <div>דמי משלוח</div>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>{`₪${(Math.round(totalSum * 10) / 10).toFixed(2)}`}</span>
              <div>סך כל ההזמנה</div>
            </div>
          </div>
        </div>
        <div className="w-full bg-blue-600 p-4 text-white font-bold text-lg hover:bg-blue-700 cursor-pointer">
          לעמוד התשלום
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
