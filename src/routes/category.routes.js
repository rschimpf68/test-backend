import { Router } from "express";

import {
  createCategory,
  getAllCategoryIncome,
  getAllCategoryExpense,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  getTopExpenseCategories,
  getTopIncomeCategories,
} from "../controllers/categories.controller.js";

const router = Router();

router.post("/category/create", createCategory);
router.get("/category/getAll/incomes", getAllCategoryIncome);
router.get("/category/getAll/expenses", getAllCategoryExpense);
router.get("/category/delete", deleteCategory);
router.post("/category/update", updateCategory);
router.get("/category/byId", getCategoryById);
router.get("/category/getAll", getAllCategories);
router.get("/category/getTop5ExpenseCategories", getTopExpenseCategories);
router.get("/category/getTop5IncomeCategories", getTopIncomeCategories);

export default router;
