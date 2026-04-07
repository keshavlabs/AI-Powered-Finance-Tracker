import ChatSidebar from "../components/ai/ChatSidebar";
import ChatMessages from "../components/ai/ChatMessages";
import ChatInput from "../components/ai/ChatInput";
import useAIStore from "../store/aiStore";

const AIChat = () => {
  const loadChat = useAIStore((state) => state.loadChat);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:h-screen md:flex-row">
      <ChatSidebar onSelectChat={loadChat} />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="border-b bg-white px-4 py-4 shadow-sm sm:px-6">
          <h1 className="text-lg font-semibold text-gray-700 sm:text-xl">
            AI Financial Assistant
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <ChatMessages />
        </div>

        <div className="border-t bg-white px-4 py-4 sm:px-6">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default AIChat;
