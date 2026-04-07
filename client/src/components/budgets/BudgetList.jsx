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
      <h2 className="text-lg font-semibold sm:text-xl">Budget Overview</h2>

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
              className="rounded-xl bg-white p-4 shadow sm:p-6"
            >
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="break-words text-base font-semibold text-gray-700 sm:text-lg">
                  {budget?.category || "Unknown"}
                </h3>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className="text-sm font-semibold sm:text-base">
                    Rs {limit}
                  </span>

                  <button
                    onClick={() => {
                      if (window.confirm("Delete this budget?")) {
                        deleteBudget(budget?._id);
                      }
                    }}
                    className="text-red-500 transition hover:text-red-700"
                    aria-label={`Delete budget ${budget?.category || "item"}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-1 gap-1 text-sm text-gray-500 sm:grid-cols-2 sm:gap-3">
                <span className="break-words">Spent: Rs {spent}</span>
                <span className="break-words sm:text-right">
                  Remaining: Rs {remaining}
                </span>
              </div>

              <div className="h-3 w-full rounded-full bg-gray-200">
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
