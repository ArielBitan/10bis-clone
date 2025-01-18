import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useUser } from "../context/userContext";

interface MessagesProps {
  order: { _id: string };
}

interface Message {
  _id: string;
  room: string;
  sender: string;
  text: string;
  createdAt: string;
  timestamp: string;
}

const Messages = ({ order }: MessagesProps) => {
  const { user } = useUser();
  const { socket } = useSocket();
  const roomId = order._id;
  const userId = user?._id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !socket) return;

    socket.emit("join-chat", { userId, room: roomId });

    socket.on("previous-messages", (messages: Message[]) => {
      setMessages(messages);
    });

    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("user-typing-message", (userId: string) => {
      setTypingUser(userId);
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("previous-messages");
      socket.off("message");
      socket.off("user-typing-message");
    };
  }, [roomId, user, socket]);

  const sendMessage = () => {
    if (newMessage.trim() && socket && user) {
      const messageData = {
        room: roomId,
        sender: userId,
        text: newMessage,
        createdAt: new Date().toISOString(), 
      };
      socket.emit("message", messageData);
      setNewMessage("");
    }
  };

  const handleTyping = () => {
    if (socket && userId) {
      socket.emit("user-typing-message", userId);
    }
  };

  return (
    <div className="">
      <div className="">
        {messages.map((message) => (
          <div
            key={message._id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <strong>
              {message.sender === userId ? "את/ה" : message.sender}: 
            </strong>
            <span>{message.text}</span>
            <div style={{ fontSize: "0.8em", color: "#888" }}>
              {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
        ))}

        {typingUser && <div>{typingUser} is typing...</div>}
      </div>

      <div className="">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
