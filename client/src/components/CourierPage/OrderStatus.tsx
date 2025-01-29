interface OrderStatusProps {
  activeOrderId: string;
  createdAt: string;
  status: string;
}

const OrderStatus = ({
  activeOrderId,
  createdAt,
  status,
}: OrderStatusProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">הזמנה נוכחית #{activeOrderId}</h2>
        <h3 className="text-textBlackSecondary">
          {new Date(createdAt).toLocaleString("he-IL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </h3>
      </div>
      <span className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full">
        {status === "Accepted" ? "איסוף" : "משלוח"}
      </span>
    </div>
  );
};

export default OrderStatus;
