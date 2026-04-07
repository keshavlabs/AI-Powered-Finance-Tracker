import { useEffect } from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import useDashboardStore from "../../store/dashboardStore";

const SummaryCards = () => {
  const { income, expenses, balance, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-lg sm:p-6">
        <div className="min-w-0">
          <p className="text-sm text-gray-500">Income</p>
          <h2 className="break-words text-xl font-bold text-green-600 sm:text-2xl">
            Rs {income.toLocaleString()}
          </h2>
        </div>

        <TrendingUp className="shrink-0 text-green-500" size={30} />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-lg sm:p-6">
        <div className="min-w-0">
          <p className="text-sm text-gray-500">Expenses</p>
          <h2 className="break-words text-xl font-bold text-red-500 sm:text-2xl">
            Rs {expenses.toLocaleString()}
          </h2>
        </div>

        <TrendingDown className="shrink-0 text-red-500" size={30} />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-lg sm:p-6 sm:col-span-2 xl:col-span-1">
        <div className="min-w-0">
          <p className="text-sm text-gray-500">Balance</p>
          <h2 className="break-words text-xl font-bold text-blue-600 sm:text-2xl">
            Rs {balance.toLocaleString()}
          </h2>
        </div>

        <Wallet className="shrink-0 text-blue-500" size={30} />
      </div>
    </div>
  );
};

export default SummaryCards;
