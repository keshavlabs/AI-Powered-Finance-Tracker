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
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>

      <input
        name="title"
        placeholder="Expense Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        type="submit"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
