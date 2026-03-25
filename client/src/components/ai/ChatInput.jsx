import { useState } from "react";
import useAIStore from "../../store/aiStore";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const sendMessage = useAIStore((state) => state.sendMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto flex items-center gap-2"
    >
      <input
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your finances..."
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
