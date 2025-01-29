import { IOrderItem } from "@/types/orderTypes";
import { Package } from "lucide-react";

interface OrderItemsProps {
  order_items: IOrderItem[];
}

const OrderItems = ({ order_items }: OrderItemsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">פריטי הזמנה:</h3>
      <ul className="text-sm text-gray-600">
        {order_items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium">{item._id.name}</span>
                <span className="mr-2 text-gray-600">{item.quantity}x</span>
              </div>
            </div>
            <div className="font-medium text-right">
              {(item._id.price * item.quantity).toFixed(2)} ₪
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItems;
