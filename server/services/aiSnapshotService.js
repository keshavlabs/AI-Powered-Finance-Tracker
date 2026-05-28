const { calculateBudgetComparison } = require("../services/budgetService");
const {
  calculateSummary,
  calculateCategorySummary,
} = require("../services/expenseService");

const snapshotCache = new Map();
const CACHE_TTL_MS = 60 * 1000;
const MAX_CACHE_SIZE = 200;

const generateFinancialSnapshot = async (userId, month, year) => {
  const cacheKey = `${userId}-${month}-${year}`;

  if (snapshotCache.has(cacheKey)) {
    const cached = snapshotCache.get(cacheKey);

    if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
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

  snapshotCache.set(cacheKey, {
    data: snapshot,
    timestamp: Date.now(),
  });

  return snapshot;
};

module.exports = generateFinancialSnapshot;
