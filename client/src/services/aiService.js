import api from "./api";

const sendMessage = async (payload) => {
  const res = await api.post("/ai/chat", payload);
  return res.data;
};

const getChats = async () => {
  const res = await api.get("/ai/chats");
  return res.data;
};

const getChatById = async (id) => {
  const res = await api.get(`/ai/chat/${id}`);
  return res.data;
};

const deleteChatById = async (id) => {
  const res = await api.delete(`/ai/chat/${id}`);
  return res.data;
};

const aiService = {
  sendMessage,
  getChats,
  getChatById,
  deleteChatById,
};

export default aiService;
