import { create } from "zustand";
import expenseService from "../services/expenseService";
import useBudgetStore from "./budgetStore";
import useDashboardStore from "./dashboardStore";

const useExpenseStore = create((set) => ({
  expenses: [],
  loading: false,

  fetchExpenses: async () => {
    set({ loading: true });

    try {
      const data = await expenseService.getExpenses();
      set({ expenses: data.expenses || [], loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  addExpenses: async (expenseData) => {
    try {
      const newExpense = await expenseService.addExpense(expenseData);
      const { fetchExpenses } = useExpenseStore.getState();
      const { fetchBudgets } = useBudgetStore.getState();
      const { fetchDashboard } = useDashboardStore.getState();

      set((state) => ({
        expenses: [...state.expenses, newExpense.expense],
      }));

      await fetchExpenses();
      await fetchBudgets();
      await fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  },

  deleteExpense: async (id) => {
    try {
      await expenseService.deleteExpense(id);

      set((state) => ({
        expenses: state.expenses.filter((exp) => exp._id !== id),
      }));

      const { fetchBudgets } = useBudgetStore.getState();
      const { fetchDashboard } = useDashboardStore.getState();

      await fetchBudgets();
      await fetchDashboard();
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useExpenseStore;
