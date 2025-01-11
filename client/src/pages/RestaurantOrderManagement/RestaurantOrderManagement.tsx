import Navbar from "@/components/layout/Navbar";
import Order from "@/components/orders/Order";

const RestaurantOrderManagement = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="">
        <Order />
      </div>
    </div>
  );
};
export default RestaurantOrderManagement;
