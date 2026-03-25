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
      <h1 className="text-2xl font-bold mb-6">Budgets</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <SetBudgetForm />
        </div>

        <div className="col-span-2">
          <BudgetList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budgets;
