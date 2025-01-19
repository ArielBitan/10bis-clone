import Navbar from "@/components/layout/Navbar";
import { UserTable } from "./UserTable";
import { useUser } from "@/components/context/userContext";
import { useEffect, useState } from "react";
import { fetchOrdersByUser } from "@/services/orderService";
import { IOrder } from "@/types/orderTypes";
import Loading from "@/components/Loading";

// interface User {
//   _id: string;
//   email: string;
//   full_name: string;
//   id: string;
// }

// interface Restaurant {
//   _id: string;
//   name: string;
//   phone: string;
//   avgRating: Record<string, unknown>;
//   id: string;
// }

// interface OrderItem {
//   _id: string;
//   quantity: number;
// }

// interface PaymentDetails {
//   method: string;
//   amount: number;
// }

// interface Order {
//   _id: string;
//   user_id: User;
//   restaurant_id: Restaurant;
//   userAddress: string;
//   order_items: OrderItem[];
//   status: string;
//   special_instructions: string[];
//   payment_details: PaymentDetails;
//   createdAt: string;
//   total_amount: number;
// }

// const orders: Order[] = [
//   {
//     _id: "67863e41ba92fc53d7204dd0",
//     user_id: {
//       _id: "67861820bf6729f7c4c25f34",
//       email: "t@gmail.com",
//       full_name: "undefined undefined",
//       id: "67861820bf6729f7c4c25f34",
//     },
//     restaurant_id: {
//       _id: "67851a1896b5908fcf1e65ec",
//       name: "דומינו'ס פיצה פולג",
//       phone: "1-700707070",
//       avgRating: {},
//       id: "67851a1896b5908fcf1e65ec",
//     },
//     userAddress: 'לח"י 15, רמת גן',
//     order_items: [
//       {
//         _id: "67851a1896b5908fcf1e65f9",
//         quantity: 2,
//       },
//     ],
//     status: "Pending",
//     special_instructions: [],
//     payment_details: {
//       method: "Card",
//       amount: 0,
//     },
//     createdAt: "2025-01-14T10:36:49.880Z",
//     total_amount: 117.9,
//   },
//   {
//     _id: "67864f4a496f42bcd1ef7ded",
//     user_id: {
//       _id: "67861820bf6729f7c4c25f34",
//       email: "t@gmail.com",
//       full_name: "undefined undefined",
//       id: "67861820bf6729f7c4c25f34",
//     },
//     restaurant_id: {
//       _id: "6785668863f00c6de19071bc",
//       name: "מנקי פוד סושי | Maneki Food Sushi",
//       phone: "055-5074089",
//       avgRating: {},
//       id: "6785668863f00c6de19071bc",
//     },
//     userAddress: "ירושלים 15, חיפה",
//     order_items: [
//       {
//         _id: "6785668863f00c6de19071c9",
//         quantity: 2,
//       },
//     ],
//     status: "Pending",
//     special_instructions: [],
//     payment_details: {
//       method: "Card",
//       amount: 0,
//     },
//     createdAt: "2025-01-14T11:49:30.597Z",
//     total_amount: 53,
//   },
// ];

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
    return <div><Loading/></div>;
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
