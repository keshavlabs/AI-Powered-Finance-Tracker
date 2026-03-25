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
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Category-wise Expenses</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
