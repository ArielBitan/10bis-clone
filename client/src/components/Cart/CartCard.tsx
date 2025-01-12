import { CartItem } from "@/pages/DetailPage/DetailPage";

interface ItemCardProps {
  item: CartItem;
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
  return (
    <div className=" bg-white flex sm:flex-row mx-2 justify-between w-[97%] overflow-hidden">
      <div className="px-4  flex-grow sm:w-2/3 flex flex-col justify-between">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <div className="flex justify-between items-center mt-4 ">
          <div className="mt-2 text-base font-semibold">{`₪${(
            Math.round((item.price || 0) * 10) / 10
          ).toFixed(2)}`}</div>

          <div className="flex items-center justify-between flex-row-reverse border border-gray-300 rounded-full px-4  h-10 w-24">
            <button
              onClick={() => onIncrement(item._id as string)}
              className="text-blue-600 text-xl "
            >
              +
            </button>
            <span className="text-lg font-semibold">{item.quantity}</span>
            <button
              onClick={() => onDecrement(item._id as string)}
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
          onClick={() => onRemove(item._id as string)}
          className=" text-blue-500 p-2 text-lg"
        >
          הסרה
        </button>
      </div>
    </div>
  );
};

export default CartCard;
