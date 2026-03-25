import { create } from "zustand";
import budgetService from "../services/budgetService";

const useBudgetStore = create((set) => ({
  budgets: [],

  fetchBudgets: async () => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const budgetRes = await budgetService.getBudgets(month, year);
      const compareRes = await budgetService.compareBudget(month, year);

      const budgets = budgetRes.budgets || [];
      const compare = compareRes.data || [];

      const merged = budgets.map((budget) => {
        const match = compare.find((item) => item.category === budget.category);

        return {
          ...budget,
          spent: match?.spent || 0,
          remaining: match?.remaining || budget.limitAmount,
        };
      });

      set({ budgets: merged });
    } catch (error) {
      console.error(error);
    }
  },

  setBudget: async (budgetData) => {
    try {
      await budgetService.setBudget(budgetData);

      const { fetchBudgets } = useBudgetStore.getState();
      await fetchBudgets(); // refresh list automatically
    } catch (error) {
      console.error(error);
    }
  },

  deleteBudget: async (id) => {
    try {
      await budgetService.deleteBudget(id);

      const { fetchBudgets } = useBudgetStore.getState();
      await fetchBudgets(); // refresh after delete
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useBudgetStore;
