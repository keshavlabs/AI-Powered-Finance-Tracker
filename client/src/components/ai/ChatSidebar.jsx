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
    <div className="flex w-full shrink-0 flex-col border-b bg-white md:h-full md:w-72 md:border-b-0 md:border-r">
      <div className="flex flex-col gap-3 border-b p-4">
        <h2 className="text-base font-semibold text-gray-800 sm:text-lg">Chats</h2>

        <button
          onClick={() => navigate("/")}
          className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-200"
        >
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto p-3 md:flex-1 md:flex-col md:overflow-x-visible md:overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="flex min-w-[220px] items-center justify-between rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200 md:min-w-0"
          >
            <div
              className="flex-1 truncate text-sm text-gray-700"
              onClick={() => onSelectChat(chat._id)}
            >
              {chat.title}
            </div>

            <button
              onClick={() => deleteChat(chat._id)}
              className="ml-2 shrink-0 text-red-400 transition hover:text-red-600"
              aria-label={`Delete chat ${chat.title}`}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
