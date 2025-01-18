import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IRestaurant } from "@/types/restaurantTypes";
import CartCard from "./CartCard";
import { useState } from "react";
import { CartItem } from "@/pages/DetailPage/DetailPage";
import { createCheckoutSession } from "@/services/orderService";
import { Loader } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useUser } from "../context/userContext";
import LogInModal from "../LandingPage/modals/LoginModal";

interface InfoCartProps {
  item: IRestaurant;
  cartDetails: CartItem[];
  setCartDetails: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<InfoCartProps> = ({
  item,
  cartDetails,
  setCartDetails,
}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const userAddress = localStorage.getItem("userAddress");
  const handlePayment = async () => {
    if (!item._id) {
      return;
    }
    setIsLoading(true);
    const response = await createCheckoutSession(
      item._id,
      cartDetails,
      userAddress as string
    );
    setIsLoading(false);
    window.location.href = response.url;
  };

  // Calculate total price
  const totalPrice = cartDetails.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );
  const deliveryFee = parseFloat(item.delivery_fee as string) || 0;
  const totalSum = totalPrice + deliveryFee;

  // Handle incrementing the quantity of an item
  const handleIncrement = (itemId: string) => {
    const updatedCart = cartDetails.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartDetails(updatedCart);
    sessionStorage.setItem(
      `cartDetails_${item._id}`,
      JSON.stringify(updatedCart)
    );
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (itemId: string) => {
    const updatedCart = cartDetails
      .map((cartItem) =>
        cartItem.id === itemId
          ? {
              ...cartItem,
              quantity: Math.max(0, cartItem.quantity - 1),
            }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);
    setCartDetails(updatedCart);
    sessionStorage.setItem(
      `cartDetails_${item._id}`,
      JSON.stringify(updatedCart)
    );
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartDetails.filter(
      (cartItem) => cartItem.id !== itemId
    );
    setCartDetails(updatedCart);
    sessionStorage.setItem(
      `cartDetails_${item._id}`,
      JSON.stringify(updatedCart)
    );
  };

  // useEffect(() => {
  //   sessionStorage.setItem(
  //     `cartDetails_${item._id}`,
  //     JSON.stringify(cartDetails)
  //   );
  // }, [cartDetails]);

  return (
    <Dialog>
      <DialogTrigger className="font-bold bg-transparent">
        <DialogTitle> מעבר לעגלה</DialogTitle>
      </DialogTrigger>
      <DialogContent className="border-none sm:max-w-[700px] dialog-slide w-full max-h-[80vh] overflow-y-auto text-3xl text-center">
        <div className="p-3 flex justify-end items-center gap-4 bg-backgroundOrange text-white">
          <h1 className="font-bold text-end text-base">{item.name}</h1>
          <img
            src={item.image as string}
            alt="logo"
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
        </div>

        <div className="px-8 py-2">
          {cartDetails.map((cartItem) => (
            <div key={cartItem.id} className="my-2">
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
        <button
          className={`w-full flex justify-center p-4 text-white font-bold text-lg cursor-pointer ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handlePayment}
        >
          {user ? (
            isLoading ? (
              <Loader className="motion-preset-spin motion-duration-2000" />
            ) : (
              "לעמוד התשלום"
            )
          ) : (
            <LogInModal rolee="signup" isHomePage={true} />
          )}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
