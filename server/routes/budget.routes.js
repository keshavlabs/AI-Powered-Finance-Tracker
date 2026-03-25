const express = require("express");
const router = express.Router();
const {
  setBudget,
  getBudgets,
  compareBudget,
  deleteBudget,
  getBudgetAlerts,
} = require("../controllers/budgetController");
const protect = require("../middlewares/middlewares");

router.post("/", protect, setBudget);
router.get("/", protect, getBudgets);
router.get("/compare", protect, compareBudget);
router.delete("/:id", protect, deleteBudget);
router.get("/alerts", protect, getBudgetAlerts);

module.exports = router;
