const Expense = require("../models/Expense");
const expenseService = require("../services/expenseService");

const addExpense = async (req, res) => {
  try {
    const { type, amount, category, description, paymentMethod, tags } =
      req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const userID = req.user;
    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    const newExpense = new Expense({
      user: userID,
      type,
      amount: parsedAmount,
      category,
      description,
      paymentMethod,
      tags,
    });

    await newExpense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });

    res.status(200).json({
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getSummary = async (req, res) => {
  try {
    const summary = await expenseService.calculateSummary(req.user);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getCategorySummary = async (req, res) => {
  try {
    const result = await expenseService.calculateCategorySummary(req.user);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const result = await expenseService.calculateMonthlySummary(req.user);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  await Expense.findOneAndDelete({
    _id: id,
    user: req.user,
  });

  res.json({ message: "Expense deleted" });
};

module.exports = {
  addExpense,
  getExpenses,
  getSummary,
  getCategorySummary,
  getMonthlySummary,
  deleteExpense,
};
