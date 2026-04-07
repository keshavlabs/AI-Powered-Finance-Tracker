import useExpenseStore from "../../store/expenseStore";
import { Trash2 } from "lucide-react";

const ExpenseItem = ({ expense }) => {
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  return (
    <div className="flex flex-col gap-3 border-b py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="break-words font-medium text-gray-800">{expense.title}</p>
        <p className="break-words text-sm text-gray-500">{expense.category}</p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p
          className={`text-sm font-semibold sm:text-base ${
            expense.type === "income" ? "text-green-600" : "text-red-500"
          }`}
        >
          {expense.type === "income" ? "+" : "-"}Rs {expense.amount}
        </p>

        <button
          onClick={() => deleteExpense(expense._id)}
          className="text-sm text-red-500 hover:text-red-700"
          aria-label={`Delete expense ${expense.title}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
