const mongoose = require("mongoose");
const Expense = require("../models/Expense");

const calculateSummary = async (userID) => {
  try {
    const result = await Expense.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userID) },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach((item) => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpense = item.total;
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  } catch (error) {
    throw error;
  }
};

const calculateCategorySummary = async (userID, type) => {
  const records = await Expense.find({
    user: userID,
    type: "expense",
  });

  const categoryTotals = {};

  records.forEach((item) => {
    const category = item.category;
    const amount = item.amount;

    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  return Object.keys(categoryTotals).map((key) => ({
    category: key,
    total: categoryTotals[key],
  }));
};

const calculateMonthlySummary = async (userID, type) => {
  const records = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userID),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  return records.map((item) => ({
    year: item._id.year,
    month: item._id.month,
    type: item._id.type,
    total: item.total,
  }));
};

module.exports = {
  calculateSummary,
  calculateCategorySummary,
  calculateMonthlySummary,
};
