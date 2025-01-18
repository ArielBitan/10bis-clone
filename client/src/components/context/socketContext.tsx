import { toast } from "@/hooks/use-toast";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./userContext";
import { IRestaurantOwner } from "@/types/userType";

// Define types for order updates
interface OrderUpdate {
  message: string;
  timestamp: string;
  type: "status" | "location" | "info";
}

interface CourierLocation {
  orderId: string;
  location: { lat: number; lng: number };
}

interface SocketProviderProps {
  children: ReactNode;
}

interface SocketContextValue {
  connected: boolean;
  newOrderReceived: boolean;
  socket: Socket | null;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  orderUpdates: Record<string, OrderUpdate[]>;
  clearOrderUpdates: (orderId: string) => void;
  courierLocation: { lat: number; lng: number } | null;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useUser();
  const ownedRestId = (user as IRestaurantOwner)?.owned_restaurants?.[0];
  const [newOrderReceived, setNewOrderReceived] = useState(false);
  const [connected, setConnected] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState<
    Record<string, OrderUpdate[]>
  >({});

  const [courierLocation, setCourierLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const URL =
      process.env.NODE_ENV === "production"
        ? window.location.origin
        : "http://localhost:3000";

    const socketInstance = io(URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!ownedRestId || !socket) return;
    joinRoom(ownedRestId);
    const handleOrderUpdate = (data: { message: string; title: string }) => {
      setNewOrderReceived(true);
      toast({ title: data.title, description: data.message });
    };

    socket.on("order-received", handleOrderUpdate);

    return () => {
      socket.off("order-received", handleOrderUpdate);
    };
  }, [socket, connected, ownedRestId]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Connected to server:", socket.id);
      setConnected(true);
    };

    const handleDisconnect = (reason: string) => {
      console.log("Disconnected from server:", reason);
      setConnected(false);
    };

    const handleError = (error: Error) => {
      console.error("Socket error:", error);
      setConnected(false);
    };

    // Add event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);
    socket.on("error", handleError);

    // Cleanup event listeners
    return () => {
      const orderRoom = localStorage.getItem("orderRoom");
      if (orderRoom) {
        leaveRoom(orderRoom);
      }

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
      socket.off("error", handleError);
    };
  }, [socket]);

  // Handle order updates
  useEffect(() => {
    if (!socket) return;

    // Rejoin rooms from localStorage
    const orderRoom = localStorage.getItem("orderRoom");
    if (orderRoom) {
      joinRoom(orderRoom);
    }

    // Handle courier location updates globally
    const handleCourierLocation = (data: CourierLocation) => {
      setCourierLocation(data.location);
    };

    socket.on("courierLocation", handleCourierLocation);

    return () => {
      socket.off("courierLocation", handleCourierLocation);
    };
  }, [socket]);

  // Room management functions with proper error handling
  const joinRoom = useCallback(
    (roomId: string) => {
      if (!socket || !connected) {
        console.warn("Cannot join room: Socket not connected");
        return;
      }

      socket.emit("join-room", { roomId }, (error: Error | null) => {
        if (error) {
          console.error("Error joining room:", error);
          return;
        }
        console.log(`Joined room: ${roomId}`);
      });
    },
    [socket, connected]
  );

  const leaveRoom = useCallback(
    (roomId: string) => {
      if (!socket) return;

      socket.emit("leave-room", { roomId }, (error: Error | null) => {
        if (error) {
          console.error("Error leaving room:", error);
          return;
        }
        console.log(`Left room: ${roomId}`);
      });
    },
    [socket]
  );

  const clearOrderUpdates = useCallback((orderId: string) => {
    setOrderUpdates((prev) => {
      const newUpdates = { ...prev };
      delete newUpdates[orderId];
      return newUpdates;
    });
  }, []);

  const contextValue: SocketContextValue = {
    socket,
    connected,
    joinRoom,
    leaveRoom,
    clearOrderUpdates,
    orderUpdates,
    newOrderReceived,
    courierLocation,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
