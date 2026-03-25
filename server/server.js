if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const expenseRoutes = require("./routes/expenses.routes");
const budgetRoutes = require("./routes/budget.routes");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "https://ai-powered-finance-tracker-1-babv.onrender.com/",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/ai", aiRoutes);

const dbUrl = process.env.DB_URL;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.listen(5000, () => {
  console.log("Server is listening to port 5000");
});
