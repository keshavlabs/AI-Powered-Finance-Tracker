import api from "./api";

const getBudgets = async (month, year) => {
  const response = await api.get(`/budgets?month=${month}&year=${year}`);
  return response.data;
};

const setBudget = async (budgetData) => {
  const response = await api.post("/budgets/", budgetData);
  return response.data;
};

const deleteBudget = async (id) => {
  const response = await api.delete(`/budgets/${id}`);
  return response.data;
};

const compareBudget = async (month, year) => {
  const response = await api.get(
    `/budgets/compare?month=${month}&year=${year}`
  );
  return response.data;
};

const getBudgetAlerts = async () => {
  const response = await api.get("/budgets/alerts");
  return response.data;
};

const budgetService = {
  getBudgets,
  setBudget,
  deleteBudget,
  compareBudget,
  getBudgetAlerts,
};

export default budgetService;
