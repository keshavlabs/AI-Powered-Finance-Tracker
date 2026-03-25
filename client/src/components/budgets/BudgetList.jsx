import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import useBudgetStore from "../../store/budgetStore";

const BudgetList = () => {
  const budgets = useBudgetStore((state) => state.budgets) || [];
  const fetchBudgets = useBudgetStore((state) => state.fetchBudgets);
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Budget Overview</h2>

      {!Array.isArray(budgets) && (
        <p className="text-red-500">Budgets data invalid</p>
      )}

      {Array.isArray(budgets) && budgets.length === 0 && (
        <p className="text-gray-500">No budgets found</p>
      )}

      {Array.isArray(budgets) &&
        budgets.map((budget, index) => {
          const spent = Number(budget?.spent) || 0;
          const limit = Number(budget?.limitAmount) || 0;

          const percent = limit ? Math.min((spent / limit) * 100, 100) : 0;
          const remaining = limit - spent;

          return (
            <div
              key={budget?._id || index}
              className="bg-white shadow rounded-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700">
                  {budget?.category || "Unknown"}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">₹{limit}</span>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this budget?")) {
                        deleteBudget(budget?._id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Spent / Remaining */}
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Spent: ₹{spent}</span>
                <span>Remaining: ₹{remaining}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className={`h-3 rounded-full ${
                    percent >= 100
                      ? "bg-red-500"
                      : percent > 80
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BudgetList;
