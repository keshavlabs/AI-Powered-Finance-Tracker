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
    <div className="mt-6 rounded-xl bg-white p-4 shadow sm:p-6 lg:mt-0">
      <h2 className="mb-4 text-lg font-semibold">Transactions</h2>

      {expenses.length === 0 && (
        <p className="text-gray-500">No expenses found</p>
      )}

      <div className="divide-y divide-gray-100">
        {expenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
