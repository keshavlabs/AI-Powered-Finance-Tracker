import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCards from "../components/dashboard/SummaryCards";
import CategoryChart from "../components/charts/CategoryCharts";
import MonthlyChart from "../components/charts/MonthlyCharts";
import BudgetComparision from "../components/budgets/BudgetComparision";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <SummaryCards />

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <CategoryChart />
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <MonthlyChart />
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Budget vs Expenses</h2>

        <BudgetComparision />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
