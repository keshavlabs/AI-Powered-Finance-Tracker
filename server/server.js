if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const expenseRoutes = require("./routes/expenses.routes");
const budgetRoutes = require("./routes/budget.routes");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
