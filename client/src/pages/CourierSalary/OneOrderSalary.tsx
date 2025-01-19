import { IOrder } from "@/types/orderTypes";

interface OneOrderSalaryProps {
  order: IOrder;
}

const OneOrderSalary: React.FC<OneOrderSalaryProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("he-IL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  console.log(order);

  return (
    <div className="flex flex-col p-4 text-right border-b border-gray-300 rtl">
      <h2 className="mb-2 text-xl font-semibold">
        {formatDate(order.createdAt)}
      </h2>

      <h3 className="text-lg font-medium text-orange-500">
        {order.restaurant_id.name}
      </h3>

      <div className="mt-2 text-sm text-gray-600">
        <div>{order._id} :מספר הזמנה</div>
      </div>
      <h1 className="mt-2 text-xl text-center text-blue-700"> שכר לנסיעה: {order?.total_amount*0.1}₪</h1>
    </div>
  );
};
export default OneOrderSalary;
