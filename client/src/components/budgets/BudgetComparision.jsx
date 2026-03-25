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

        const percent = Math.min((spent / budget) * 100, 100);

        const barColor =
          percent >= 100
            ? "bg-red-500"
            : percent > 80
            ? "bg-yellow-500"
            : "bg-green-500";

        return (
          <div key={item.category} className="bg-white shadow rounded-xl p-5">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-gray-700">{item.category}</h3>

              <span className="text-sm text-gray-500">
                {percent.toFixed(0)}%
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Budget: ₹{budget}</span>
              <span>Spent: ₹{spent}</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
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
