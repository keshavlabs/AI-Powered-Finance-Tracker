import useAIStore from "../../store/aiStore";
import ReactMarkdown from "react-markdown";

const ChatMessages = () => {
  const messages = useAIStore((state) => state.messages);
  const loading = useAIStore((state) => state.loading);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 sm:gap-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[85%] sm:px-5 sm:py-4 ${
              msg.role === "user"
                ? "bg-blue-600 text-white"
                : "border bg-white text-gray-800"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-sm max-w-none break-words">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="break-words whitespace-pre-wrap">{msg.content}</p>
            )}
          </div>
        </div>
      ))}

      {loading && (
        <div className="px-1 text-sm text-gray-400 animate-pulse">
          AI is thinking...
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
