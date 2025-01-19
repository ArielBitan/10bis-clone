import { Link } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

interface ActiveOrderLinkProps {
  orderId: string;
}

const ActiveOrderLink = ({ orderId }: ActiveOrderLinkProps) => {
  return (
    <Link to={`/order/${orderId}`}>
      <div className="fixed md:top-1/2 md:right-0 top-56 right-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
        <ArrowRightCircle size={20} />
        <span className="font-medium hidden md:block">צפה בהזמנה שלך</span>
      </div>
    </Link>
  );
};

export default ActiveOrderLink;
