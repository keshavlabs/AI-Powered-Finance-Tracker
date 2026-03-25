import { useState } from "react";
import useBudgetStore from "../../store/budgetStore";

const AddBudgetForm = () => {
  const setBudget = useBudgetStore((state) => state.setBudget);

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount) {
      alert("Please fill all fields");
      return;
    }

    const today = new Date();

    const payload = {
      category: formData.category,
      limitAmount: parseFloat(formData.amount),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };

    console.log("Sending:", payload);

    await setBudget(payload);

    setFormData({
      category: "",
      amount: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 max-w-md"
    >
      <input
        className="border p-2 w-full mb-4 rounded"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-4 rounded"
        name="amount"
        type="number"
        placeholder="Budget Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="submit"
      >
        Add Budget
      </button>
    </form>
  );
};

export default AddBudgetForm;
