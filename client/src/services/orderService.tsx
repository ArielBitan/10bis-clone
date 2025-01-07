import { useUser } from "@/components/context/userContext";
import api from "@/lib/api";
import { IOrder } from "@/types/orderTypes";

// Function to fetch all orders
export const fetchAllOrders = async (): Promise<IOrder[]> => {
  try {
    const { data } = await api.get<IOrder[]>(`/orders`);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const acceptOrder = async (orderId: string) => {
  const { user } = useUser();
  try {
    const { data } = await api.put(`/orders/${orderId}`, {
      courierId: user?._id,
    });
    return data;
  } catch (error) {
    console.error("Error accepting order:", error);
    throw error;
  }
};

export const fetchCourierActiveOrder = async () => {
  try {
    const { data } = await api.get("/orders/:courierId");
    return data;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
};

// Function to fetch orders by status
export const fetchOrdersByStatus = async (
  status: string
): Promise<IOrder[]> => {
  try {
    const { data } = await api.get<IOrder[]>(`/orders/${status}`);
    return data;
  } catch (error) {
    console.error(`Error fetching orders with status ${status}:`, error);
    throw error;
  }
};

// Function to fetch a single order by ID
export const fetchOrderById = async (orderId: string): Promise<IOrder> => {
  try {
    const { data } = await api.get<IOrder>(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw error;
  }
};

// Function to fetch orders by user
export const fetchOrdersByUser = async (userId: string): Promise<IOrder[]> => {
  try {
    const { data } = await api.get<IOrder[]>(`/orders/user/${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching orders for user with ID ${userId}:`, error);
    throw error;
  }
};

// Function to create a new order
export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  try {
    const { data } = await api.post<IOrder>("/orders", orderData);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Function to update an existing order
export const updateOrder = async (
  orderId: string,
  updatedData: Partial<IOrder>
): Promise<IOrder> => {
  try {
    const { data } = await api.put<IOrder>(`/orders/${orderId}`, updatedData);
    return data;
  } catch (error) {
    console.error(`Error updating order with ID ${orderId}:`, error);
    throw error;
  }
};

// Function to delete an order
export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    await api.delete(`/orders/${orderId}`);
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error);
    throw error;
  }
};
