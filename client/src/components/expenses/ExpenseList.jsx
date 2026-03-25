import { useEffect } from "react";
import useExpenseStore from "../../store/expenseStore";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const fetchExpenses = useExpenseStore((state) => state.fetchExpenses);
  console.log("Expenses:", expenses);

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!Array.isArray(expenses)) {
    return <p className="text-red-500">Invalid expense data</p>;
  }

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      {expenses.length === 0 && (
        <p className="text-gray-500">No expenses found</p>
      )}

      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
