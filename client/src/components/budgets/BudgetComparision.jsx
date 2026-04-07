import { useEffect, useState } from "react";
import budgetService from "../../services/budgetService";

const BudgetComparison = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const res = await budgetService.compareBudget();
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComparison();
  }, []);

  return (
    <div className="space-y-6">
      {data.map((item) => {
        const spent = item.spent || 0;
        const budget = item.limitAmount || 0;
        const percent = budget ? Math.min((spent / budget) * 100, 100) : 0;

        const barColor =
          percent >= 100
            ? "bg-red-500"
            : percent > 80
            ? "bg-yellow-500"
            : "bg-green-500";

        return (
          <div
            key={item.category}
            className="rounded-xl border border-gray-100 bg-white p-4 shadow sm:p-5"
          >
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-semibold text-gray-700 sm:text-base">
                {item.category}
              </h3>

              <span className="text-sm text-gray-500">{percent.toFixed(0)}%</span>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-1 text-sm text-gray-500 sm:grid-cols-2 sm:gap-3">
              <span className="break-words">Budget: Rs {budget}</span>
              <span className="break-words sm:text-right">Spent: Rs {spent}</span>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className={`${barColor} h-3 rounded-full`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetComparison;
