import { useEffect, useState } from "react";
import expenseService from "../../services/expenseService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthlyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const res = await expenseService.getMonthlySummary();

      const grouped = {};

      res.data.forEach((item) => {
        const m = item.month;

        if (!grouped[m]) {
          grouped[m] = {
            month: MONTHS[m - 1],
            income: 0,
            expense: 0,
          };
        }

        if (item.type === "income") {
          grouped[m].income = item.total;
        }

        if (item.type === "expense") {
          grouped[m].expense = item.total;
        }
      });

      setData(Object.values(grouped));
    };

    fetchMonthlyData();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Income vs Expense Trend</h2>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />

          <Legend />

          <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />

          <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
