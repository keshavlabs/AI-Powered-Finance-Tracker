import { useEffect } from "react";
import useExpenseStore from "../store/expenseStore";
import AddExpenseForm from "../components/expenses/AddExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import DashboardLayout from "../components/layout/DashboardLayout";

const Expenses = () => {
  const fetchExpenses = useExpenseStore((state) => state.fetchExpenses);

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Expenses</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <AddExpenseForm />
        </div>

        <div className="col-span-2">
          <ExpenseList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
