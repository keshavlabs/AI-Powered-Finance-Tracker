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
      className="w-full rounded-xl bg-white p-4 shadow-md sm:max-w-md sm:p-6"
    >
      <input
        className="mb-4 min-h-[44px] w-full rounded border p-3 text-sm sm:text-base"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        className="mb-4 min-h-[44px] w-full rounded border p-3 text-sm sm:text-base"
        name="amount"
        type="number"
        placeholder="Budget Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <button
        className="min-h-[44px] w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto sm:text-base"
        type="submit"
      >
        Add Budget
      </button>
    </form>
  );
};

export default AddBudgetForm;
