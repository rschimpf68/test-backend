import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createIncome = async (req, res) => {
  const { amount, description, date, categoryId, userId } = req.body;
  const userIdInt = parseInt(userId);
  console.log(description, "Description");
  const income = await prisma.income.create({
    data: {
      amount,
      description,
      date,
      User: {
        connect: {
          userId: userIdInt,
        },
      },
      Category: {
        connect: {
          categoryId: categoryId,
        },
      },
    },
  });
  res.json(income);
};

export const createExpense = async (req, res) => {
  const { amount, description, date, categoryId, userId } = req.body;
  const userIdInt = parseInt(userId);
  const expense = await prisma.expense.create({
    data: {
      amount,
      description,
      date,
      User: {
        connect: {
          userId: userIdInt,
        },
      },
      Category: {
        connect: {
          categoryId: categoryId,
        },
      },
    },
  });
  res.json(expense);
};

export const getAllExpenses = async (req, res) => {
  const userId = parseInt(req.query.userId);
  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
    },
    include: {
      Category: true,
    },
  });
  res.json(expenses);
};

export const getAllIncomes = async (req, res) => {
  const userId = parseInt(req.query.userId);
  const incomes = await prisma.income.findMany({
    where: {
      userId: userId,
    },
    include: {
      Category: true,
    },
  });
  res.json(incomes);
};

export const getTransactionsBalance = async (req, res) => {
  const userId = parseInt(req.query.userId);
  const incomes = await prisma.income.findMany({
    where: {
      userId: userId,
    },
  });
  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
    },
  });
  const totalIncomes = incomes.reduce((acc, income) => {
    return acc + income.amount;
  }, 0);
  const totalExpenses = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  const balance = totalIncomes - totalExpenses;
  const percentage = ((totalIncomes / totalExpenses) * 100).toFixed(0);
  const response = {
    totalIncomes,
    totalExpenses,
    balance,
    percentage,
  };
  res.json(response);
};

export const getAllTransactions = async (req, res) => {
  const userId = parseInt(req.query.userId);
  const filter = req.query.filter;

  const incomes = await prisma.income.findMany({
    where: {
      userId: userId,
    },
    include: {
      Category: true,
    },
  });
  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
    },
    include: {
      Category: true,
    },
  });
  const finalExpenses = expenses.map((expense) => ({
    ...expense,
    isExpense: true,
  }));
  const finalIncomes = incomes.map((income) => ({
    ...income,
    isExpense: false,
  }));
  if (filter == "income") res.json(finalIncomes);
  else if (filter == "expense") res.json(finalExpenses);
  else res.json([...finalIncomes, ...finalExpenses]);
};
