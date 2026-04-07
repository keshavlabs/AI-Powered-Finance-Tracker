import { useEffect, useState } from "react";
import expenseService from "../../services/expenseService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#a855f7",
];

const CategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await expenseService.getCategorySummary();

      const formatted = res.data.map((item) => ({
        category: item.category,
        amount: item.total,
      }));

      setData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-xl bg-white p-4 shadow sm:p-6">
      <h2 className="mb-4 text-base font-semibold sm:text-lg">
        Category-wise Expenses
      </h2>

      <div className="h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius={90}
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
