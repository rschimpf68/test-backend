import { Router } from "express";
import {
  createIncome,
  createExpense,
  getAllIncomes,
  getAllExpenses,
  getTransactionsBalance,
  getAllTransactions,
} from "../controllers/transactions.controller.js ";

const router = Router();

router.post("/income/create", createIncome);
router.post("/expense/create", createExpense);
router.get("/expense/getAll", getAllExpenses);
router.get("/income/getAll", getAllIncomes);
router.get("/transactions/getBalance", getTransactionsBalance);
router.get("/transactions/getAll", getAllTransactions);
export default router;
