import useExpenseStore from "../../store/expenseStore";
import { Trash2 } from "lucide-react";

const ExpenseItem = ({ expense }) => {
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  return (
    <div className="flex justify-between items-center border-b py-3">
      <div>
        <p className="font-medium">{expense.title}</p>
        <p className="text-sm text-gray-500">{expense.category}</p>
      </div>

      <div className="flex items-center gap-4">
        <p
          className={`font-semibold ${
            expense.type === "income" ? "text-green-600" : "text-red-500"
          }`}
        >
          {expense.type === "income" ? "+" : "-"}₹{expense.amount}
        </p>

        <button
          onClick={() => deleteExpense(expense._id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
