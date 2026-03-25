import ChatSidebar from "../components/ai/ChatSidebar";
import ChatMessages from "../components/ai/ChatMessages";
import ChatInput from "../components/ai/ChatInput";
import useAIStore from "../store/aiStore";

const AIChat = () => {
  const loadChat = useAIStore((state) => state.loadChat);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ChatSidebar onSelectChat={loadChat} />

      {/* Main Chat */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm">
          <h1 className="text-xl font-semibold text-gray-700">
            AI Financial Assistant 💰
          </h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ChatMessages />
        </div>

        {/* Input */}
        <div className="bg-white border-t p-4">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default AIChat;
