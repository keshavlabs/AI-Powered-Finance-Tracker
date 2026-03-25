import useAIStore from "../../store/aiStore";
import ReactMarkdown from "react-markdown";

const ChatMessages = () => {
  const messages = useAIStore((state) => state.messages);
  const loading = useAIStore((state) => state.loading);

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-5 py-4 rounded-2xl text-sm leading-relaxed max-w-[80%] shadow-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-800"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ) : (
              msg.content
            )}
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-gray-400 text-sm animate-pulse">
          AI is thinking...
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
