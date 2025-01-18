import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useUser } from "../context/userContext";
import { Button } from "../ui/button";

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

  const getSenderLabel = (sender: string) => {
    if (sender === userId) {
      return "את/ה";
    }

    const senderRole = user?.role ? "לקוח" : "נציג";
    return senderRole;
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="font-semibold text-center text-orangePrimary">
            אין עדיין הודעות, אנא המתן...
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className="flex flex-row-reverse gap-4 p-2 mb-2 border-b"
            >
              <div className="flex flex-col gap-2">
                <strong
                  className={
                    message.sender === user?._id ? "" : "text-orangePrimary"
                  }
                >
                  :{getSenderLabel(message.sender)}
                </strong>
                <div className="text-sm text-textBlackSecondary">
                  {new Date(message.createdAt).toLocaleString()}
                </div>
              </div>
              <span className="text-base">{message.text}</span>
            </div>
          ))
        )}

        {typingUser && <div className="text-sm text-gray-500">הקלד...</div>}
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={sendMessage} className="p-6 mt-1">
          שלח
        </Button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="...הקלד"
          className="w-full px-4 py-2 text-right border rounded-md"
        />
      </div>
    </div>
  );
};

export default Messages;
