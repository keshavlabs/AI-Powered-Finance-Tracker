const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  getSummary,
  getCategorySummary,
  getMonthlySummary,
  deleteExpense,
} = require("../controllers/expenseController");
const protect = require("../middlewares/middlewares");

router.post("/add", protect, addExpense);
router.get("/", protect, getExpenses);
router.get("/summary", protect, getSummary);
router.get("/category-summary", protect, getCategorySummary);
router.get("/monthly-summary", protect, getMonthlySummary);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
