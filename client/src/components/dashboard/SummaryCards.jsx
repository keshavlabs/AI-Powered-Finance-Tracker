import { useEffect, useState } from "react";
import expenseService from "../../services/expenseService";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import useDashboardStore from "../../store/dashboardStore";

const SummaryCards = () => {
  const { income, expenses, balance, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* Income Card */}
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center hover:shadow-lg transition">
        <div>
          <p className="text-gray-500 text-sm">Income</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹{income.toLocaleString()}
          </h2>
        </div>

        <TrendingUp className="text-green-500" size={32} />
      </div>

      {/* Expense Card */}
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center hover:shadow-lg transition">
        <div>
          <p className="text-gray-500 text-sm">Expenses</p>
          <h2 className="text-2xl font-bold text-red-500">
            ₹{expenses.toLocaleString()}
          </h2>
        </div>

        <TrendingDown className="text-red-500" size={32} />
      </div>

      {/* Balance Card */}
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center hover:shadow-lg transition">
        <div>
          <p className="text-gray-500 text-sm">Balance</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ₹{balance.toLocaleString()}
          </h2>
        </div>

        <Wallet className="text-blue-500" size={32} />
      </div>
    </div>
  );
};

export default SummaryCards;
