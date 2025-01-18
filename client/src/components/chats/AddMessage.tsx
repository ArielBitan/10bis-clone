import { FormEvent } from "react";

interface AddMessageFormProps {
  messageInputValue: string;
  onMessageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (e: FormEvent) => void;
}

export function AddMessageForm({
  messageInputValue,
  onMessageInputChange,
  sendMessage,
}: AddMessageFormProps) {
  return (
    <form onSubmit={sendMessage}>
      <input
        required
        className="w-full p-2 mb-4 border-2 rounded-md border-slate-950"
        type="text"
        value={messageInputValue}
        onChange={onMessageInputChange}
        placeholder="Type a message..."
      />
      <button
        className="w-full px-6 py-2 text-white uppercase bg-violet-500 rounded-xl"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
