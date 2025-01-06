import { IOrder } from "@/types/orderTypes";

interface IOrderCardProps {
  order: IOrder;
}

const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
  return (
    <div className="p-4 bg-slate-300 m-2">
      <h2 className="font-semibold text-md">פרטי המסעדה:</h2>
      <div>{order.restaurant_id.name}</div>
      <div>
        <span className="font-normal">טלפון: </span>
        {order.restaurant_id.phone}
      </div>
      <div>{}</div>
    </div>
  );
};

export default OrderCard;
