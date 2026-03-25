import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAIStore from "../../store/aiStore";

const ChatSidebar = ({ onSelectChat }) => {
  const { chats, fetchChats, deleteChat } = useAIStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="w-64 bg-white border-r flex flex-col">
      {/* Top Section */}
      <div className="p-4 border-b flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Chats</h2>

        {/* 🔥 Home Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm transition"
        >
          ⬅ Home
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
          >
            <div
              className="flex-1 text-sm text-gray-700 truncate"
              onClick={() => onSelectChat(chat._id)}
            >
              {chat.title}
            </div>

            <button
              onClick={() => deleteChat(chat._id)}
              className="text-red-400 hover:text-red-600 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
