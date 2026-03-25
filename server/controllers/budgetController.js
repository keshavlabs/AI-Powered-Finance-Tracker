const mongoose = require("mongoose");
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const { calculateBudgetComparison } = require("../services/budgetService");

const setBudget = async (req, res) => {
  try {
    const { category, limitAmount, month, year } = req.body;
    const user = req.user;

    if (
      !category ||
      limitAmount === undefined ||
      month === undefined ||
      year === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const parsedAmount = Number(limitAmount);
    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        message: "limitAmount must be greater than 0",
      });
    }

    if (
      isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      isNaN(parsedYear)
    ) {
      return res.status(400).json({
        message: "Invalid month or year",
      });
    }

    const budget = await Budget.findOneAndUpdate(
      { user, category, month: parsedMonth, year: parsedYear },
      { $set: { limitAmount: parsedAmount } },
      { upsert: true, returnDocument: "after", runValidators: true }
    );

    res.status(200).json({
      message: "Budget set successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getBudgets = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required",
      });
    }

    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (
      isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      isNaN(parsedYear)
    ) {
      return res.status(400).json({
        message: "Invalid month or year",
      });
    }

    const budgets = await Budget.find({
      user: req.user,
      month: parsedMonth,
      year: parsedYear,
      deletedAt: null,
    });

    res.status(200).json({
      month: parsedMonth,
      year: parsedYear,
      budgets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const compareBudget = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required",
      });
    }

    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (
      isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      isNaN(parsedYear)
    ) {
      return res.status(400).json({
        message: "Invalid month or year",
      });
    }

    const data = await calculateBudgetComparison(
      req.user,
      parsedMonth,
      parsedYear
    );

    res.status(200).json({
      month: parsedMonth,
      year: parsedYear,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Budget ID",
      });
    }

    const budget = await Budget.findOneAndUpdate(
      {
        _id: id,
        user: req.user,
        deletedAt: null,
      },
      {
        $set: { deletedAt: new Date() },
      },
      {
        returnDocument: "after",
      }
    );

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found or already deleted",
      });
    }

    res.status(200).json({
      message: "Budget deleted successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getBudgetAlerts = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required",
      });
    }

    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (
      isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      isNaN(parsedYear)
    ) {
      return res.status(400).json({
        message: "Invalid month or year",
      });
    }

    const comparisionData = await calculateBudgetComparison(
      req.user,
      parsedMonth,
      parsedYear
    );

    const alerts = [];

    comparisionData.forEach((item) => {
      const { category, limitAmount, spent, remaining } = item;

      if (remaining < 0) {
        alerts.push({
          category,
          type: "OVERSPENT",
          message: `You exceeded your ${category} budget by ₹${Math.abs(
            remaining
          )}`,
        });
      } else if (limitAmount > 0 && spent / limitAmount >= 0.8) {
        alerts.push({
          category,
          type: "WARNING",
          message: `You have used ${Math.round(
            (spent / limitAmount) * 100
          )}% of your ${category} budget`,
        });
      }
    });

    return res.status(200).json({
      month: parsedMonth,
      year: parsedYear,
      alerts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  setBudget,
  getBudgets,
  compareBudget,
  deleteBudget,
  getBudgetAlerts,
};
