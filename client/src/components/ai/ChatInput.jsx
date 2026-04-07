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
      className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-end"
    >
      <input
        className="min-h-12 w-full flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 sm:rounded-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your finances..."
      />

      <button
        type="submit"
        className="min-h-12 w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:rounded-full"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
