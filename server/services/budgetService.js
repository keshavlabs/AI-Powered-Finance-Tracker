const mongoose = require("mongoose");
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const calculateBudgetComparison = async (userId, month, year) => {
  try {
    const budgets = await Budget.find({
      user: userId,
      month,
      year,
      deletedAt: { $in: [null, undefined] },
    });

    const expenses = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: "expense",
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, month] },
              { $eq: [{ $year: "$date" }, year] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const expenseMap = {};
    expenses.forEach((item) => {
      expenseMap[item._id] = item.total;
    });

    const result = [];
    const processedCategories = new Set();

    budgets.forEach((budgets) => {
      const spent = expenseMap[budgets.category] || 0;
      const remaining = budgets.limitAmount - spent;

      result.push({
        category: budgets.category,
        limitAmount: budgets.limitAmount,
        spent,
        remaining,
      });

      processedCategories.add(budgets.category);
    });

    Object.keys(expenseMap).forEach((category) => {
      if (!processedCategories.has(category)) {
        const spent = expenseMap[category];

        result.push({
          category,
          limitAmount: 0,
          spent,
          remaining: -spent,
        });
      }
    });

    result.sort((a, b) => a.remaining - b.remaining);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { calculateBudgetComparison };
