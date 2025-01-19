import { useUser } from "@/components/context/userContext";
import UserMenu from "@/components/layout/UserMenu";
import Loading from "@/components/Loading";
import { fetchAllOrders } from "@/services/orderService";
import { IOrder } from "@/types/orderTypes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OneOrderSalary from "./OneOrderSalary";

const CourierSalary = () => {
  const { user } = useUser();
  const userId = user?._id;
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (userId) {
          const fetchedOrders = await fetchAllOrders();
          console.log(fetchedOrders);

          const CourierOrders = fetchedOrders.filter(
            (order) => order?.courier_id?._id === userId
          );
          console.log(CourierOrders);

          setOrders(fetchedOrders);
        }
        setLoading(false);
      } catch (err: unknown) {
        console.error("Error fetching orders:", err);
        setError("Error fetching orders");
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  const totalAmount = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  return (
    <div className="h-screen max-w-md mx-auto bg-gray-50">
      <div className="sticky top-0 z-10 p-4 shadow-sm bg-orangePrimary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserMenu />
          </div>
          <Link
            to="/home"
            className="flex items-center justify-center space-x-1 transition-transform duration-300 hover:scale-110"
          >
            <img
              className="w-20 sm:w-20 md:w-20 lg:w-28"
              src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/white-logo-ec59fa.svg"
              alt="website-img"
            />
          </Link>
        </div>
      </div>
      <div>
        <h1 className="mt-10 mb-12 text-4xl text-center text-textBlackSecondary">
          דו"ח השכר שלך
        </h1>{" "}
        <div className="flex justify-around mb-12">
          <h2 className="text-xl">נסיעות: {orders.length}</h2>
          <h2 className="text-xl">שכר כולל: {(totalAmount*0.1).toFixed(1)}₪</h2>
        </div>
        <h1 className="text-2xl text-center underline">כל הנסיעות </h1>
        {orders.map((order) => (
          <OneOrderSalary order={order} key={order._id} />
        ))}
      </div>
    </div>
  );
};

export default CourierSalary;
