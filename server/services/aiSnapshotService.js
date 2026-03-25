const { calculateBudgetComparison } = require("../services/budgetService");
const {
  calculateSummary,
  calculateCategorySummary,
} = require("../services/expenseService");

const snapshotCache = {};

const generateFinancialSnapshot = async (userId, month, year) => {
  const cacheKey = `${userId}-${month}-${year}`;

  if (snapshotCache[cacheKey]) {
    const cached = snapshotCache[cacheKey];

    if (Date.now() - cached.timestamp < 60000) {
      return cached.data;
    }
  }
  const summary = await calculateSummary(userId);
  const categoryData = await calculateCategorySummary(userId, "expense");
  const budgetComparison = await calculateBudgetComparison(userId, month, year);

  const snapshot = {
    totalIncome: summary.totalIncome,
    totalExpense: summary.totalExpense,
    balance: summary.balance,
    topExpenseCategories: categoryData,
    budgetStatus: budgetComparison,
  };

  snapshotCache[cacheKey] = {
    data: snapshot,
    timestamp: Date.now(),
  };

  return snapshot;
};

module.exports = generateFinancialSnapshot;
