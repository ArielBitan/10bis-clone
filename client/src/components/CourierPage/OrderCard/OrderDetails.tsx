import { IOrder } from "@/types/orderTypes";

interface IOrderProps {
  order: IOrder;
}

const OrderDetails = ({ order }: IOrderProps) => {
  return (
    <div className="mt-4 space-y-4">
      {/* Order Items */}
      <div className="text-sm text-gray-800">
        <h3 className="mb-2 font-semibold">פרטי המנות:</h3>
        <div className="space-y-2">
          {order.order_items.length > 0 ? (
            order.order_items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between pb-2 border-b border-gray-100"
              >
                <span>{item._id.name}</span>
                <span className="font-medium">{item._id.price} ₪</span>
              </div>
            ))
          ) : (
            <p>לא נוספו מנות</p>
          )}
        </div>
      </div>

      {/* Special Instructions */}
      {order.special_instructions.length > 0 && (
        <div className="text-sm text-gray-800">
          <h3 className="mb-2 font-semibold">הוראות מיוחדות:</h3>
          <ul className="space-y-1 list-disc list-inside">
            {order.special_instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Order Summary */}
      <div className="pt-3 text-sm border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-semibold">סה"כ לתשלום:</span>
          <span className="text-lg font-bold">{order.total_amount} ₪</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
