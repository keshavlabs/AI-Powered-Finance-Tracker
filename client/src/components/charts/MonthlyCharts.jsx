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
    <div className="rounded-xl bg-white p-4 shadow sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold sm:text-lg">
          Income vs Expense Trend
        </h2>
      </div>

      <div className="h-[300px] sm:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} width={40} />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
