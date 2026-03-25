import { create } from "zustand";
import expenseService from "../services/expenseService";

const useDashboardStore = create((set) => ({
  income: 0,
  expenses: 0,
  balance: 0,

  fetchDashboard: async () => {
    const summary = await expenseService.getSummary();

    console.log(summary);

    set({
      income: summary.totalIncome || 0,
      expenses: summary.totalExpense || 0,
      balance: summary.balance || 0,
    });
  },
}));

export default useDashboardStore;
