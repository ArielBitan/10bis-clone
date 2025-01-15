import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";

// Define types for order updates
interface OrderUpdate {
  message: string;
  timestamp: string;
  type: "status" | "location" | "info";
}

interface SocketProviderProps {
  children: ReactNode;
}

interface SocketContextValue {
  connected: boolean;
  socket: Socket | null;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  orderUpdates: Record<string, OrderUpdate[]>;
  clearOrderUpdates: (orderId: string) => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState<
    Record<string, OrderUpdate[]>
  >({});
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
        localStorage.setItem("orderRoom", roomId);
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
        localStorage.removeItem("orderRoom");
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

  // Handle order updates
  useEffect(() => {
    if (!socket) return;

    const handleOrderUpdate = (data: OrderUpdate & { orderId: string }) => {
      console.log("Order update received:", data);
      const { orderId, ...updateData } = data;

      setOrderUpdates((prev) => ({
        ...prev,
        [orderId]: [
          {
            message: updateData.message,
            timestamp: updateData.timestamp || new Date().toISOString(),
            type: updateData.type || "info",
          },
          ...(prev[orderId] || []),
        ],
      }));
    };

    socket.on("order-update", handleOrderUpdate);

    return () => {
      socket.off("order-update", handleOrderUpdate);
    };
  }, [socket]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Connected to server:", socket.id);
      setConnected(true);

      // Rejoin room if previously connected
      const orderRoom = localStorage.getItem("orderRoom");
      if (orderRoom) {
        joinRoom(orderRoom);
      }
    };

    const handleDisconnect = (reason: string) => {
      console.log("Disconnected from server:", reason);
      setConnected(false);
    };

    const handleError = (error: Error) => {
      console.error("Socket error:", error);
      setConnected(false);
    };

    const handleReconnect = (attemptNumber: number) => {
      console.log(`Reconnection attempt ${attemptNumber}`);
    };

    const handleReconnectError = (error: Error) => {
      console.error("Reconnection error:", error);
      setConnected(false);
    };

    // Add event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);
    socket.on("error", handleError);
    socket.on("reconnect", handleReconnect);
    socket.on("reconnect_error", handleReconnectError);

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
      socket.off("reconnect", handleReconnect);
      socket.off("reconnect_error", handleReconnectError);
    };
  }, [socket, joinRoom, leaveRoom]);

  const contextValue: SocketContextValue = {
    socket,
    connected,
    joinRoom,
    leaveRoom,
    clearOrderUpdates,
    orderUpdates,
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
