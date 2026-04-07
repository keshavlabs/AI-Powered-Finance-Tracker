import { useState } from "react";
import useExpenseStore from "../../store/expenseStore";

const AddExpenseForm = () => {
  const addExpense = useExpenseStore((state) => state.addExpenses);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addExpense({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: "",
      category: "",
      type: "expense",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-4 shadow sm:p-6">
      <h2 className="mb-4 text-lg font-semibold">Add Expense</h2>

      <input
        name="title"
        placeholder="Expense Title"
        value={formData.title}
        onChange={handleChange}
        className="mb-3 min-h-[44px] w-full rounded border p-3 text-sm sm:text-base"
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="mb-3 min-h-[44px] w-full rounded border p-3 text-sm sm:text-base"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="mb-3 min-h-[44px] w-full rounded border p-3 text-sm sm:text-base"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="mb-4 min-h-[44px] w-full rounded border p-3 text-sm sm:text-base"
      />

      <button
        className="min-h-[44px] w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:text-base"
        type="submit"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
