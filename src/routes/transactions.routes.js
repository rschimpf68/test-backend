import { Router } from "express";
import { createIncome, createExpense, getAllIncomes, getAllExpenses } from "../controllers/transactions.controller.js ";




const router = Router();

router.post("/income/create", createIncome);
router.post("/expense/create", createExpense);
router.get("/expense/getAll", getAllExpenses);
router.get("/income/getAll", getAllIncomes);



export default router;