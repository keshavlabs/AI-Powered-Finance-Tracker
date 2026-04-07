import { useEffect } from "react";
import useBudgetStore from "../store/budgetStore";
import SetBudgetForm from "../components/budgets/SetBudgetForm";
import BudgetList from "../components/budgets/BudgetList";
import DashboardLayout from "../components/layout/DashboardLayout";

const Budgets = () => {
  const fetchBudgets = useBudgetStore((state) => state.fetchBudgets);

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-bold">Budgets</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SetBudgetForm />
        </div>

        <div className="lg:col-span-2">
          <BudgetList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budgets;
