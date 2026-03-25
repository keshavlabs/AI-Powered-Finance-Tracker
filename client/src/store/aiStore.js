import { create } from "zustand";
import aiService from "../services/aiService";

const useAIStore = create((set) => ({
  chats: [],
  messages: [],
  chatId: null,
  loading: false,

  fetchChats: async () => {
    const data = await aiService.getChats();
    set({ chats: data.allChats });
  },

  loadChat: async (id) => {
    const data = await aiService.getChatById(id);

    set({
      chatId: id,
      messages: data.messages,
    });
  },

  sendMessage: async (message) => {
    set((state) => ({
      messages: [...state.messages, { role: "user", content: message }],
      loading: true,
    }));

    try {
      const state = useAIStore.getState();

      const response = await aiService.sendMessage({
        chatId: state.chatId,
        message,
      });

      set((state) => ({
        chatId: response.chatId,
        messages: [
          ...state.messages,
          { role: "assistant", content: response.reply },
        ],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  deleteChat: async (id) => {
    try {
      await aiService.deleteChatById(id);

      set((state) => ({
        chats: state.chats.filter((chat) => chat._id !== id),
        messages: state.chatId === id ? [] : state.messages,
        chatId: state.chatId === id ? null : state.chatId,
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAIStore;
