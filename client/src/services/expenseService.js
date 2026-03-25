import api from "./api";

const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

const addExpense = async (expenseData) => {
  const response = await api.post("/expenses/add", expenseData);
  return response.data;
};

const getSummary = async () => {
  const response = await api.get("/expenses/summary");
  return response.data;
};

const getCategorySummary = async () => {
  const response = await api.get("/expenses/category-summary");
  return response.data;
};

const getMonthlySummary = async () => {
  const response = await api.get("/expenses/monthly-summary");
  return response.data;
};

const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

const expenseService = {
  getExpenses,
  addExpense,
  getSummary,
  getCategorySummary,
  getMonthlySummary,
  deleteExpense,
};

export default expenseService;
