import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCards from "../components/dashboard/SummaryCards";
import CategoryChart from "../components/charts/CategoryCharts";
import MonthlyChart from "../components/charts/MonthlyCharts";
import BudgetComparision from "../components/budgets/BudgetComparision";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <SummaryCards />

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6">
          <CategoryChart />
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <MonthlyChart />
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Budget vs Expenses</h2>

        <BudgetComparision />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
