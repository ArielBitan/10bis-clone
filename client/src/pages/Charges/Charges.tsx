import Navbar from "@/components/layout/Navbar";
import { UserTable } from "./UserTable";
import { useUser } from "@/components/context/userContext";
import { useEffect, useState } from "react";
import { fetchOrdersByUser } from "@/services/orderService";
import { IOrder } from "@/types/orderTypes";
import Loading from "@/components/Loading";

const Charges = () => {
  const { user } = useUser();
  const userId = user?._id;
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (userId) {
          const fetchedOrders = await fetchOrdersByUser(userId);
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
  }, [userId]);
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

  return (
    <div>
      <Navbar />
      <h1 className="mt-16 mb-8 text-4xl text-center text-textBlackSecondary">
        דו"ח החיובים שלך
      </h1>
      <UserTable orders={orders} />
    </div>
  );
};
export default Charges;
