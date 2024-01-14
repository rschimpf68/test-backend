import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const createIncome = async (req, res) => {

   const { amount, description, date, categoryId, userId } = req.body
   const userIdInt = parseInt(userId);
   console.log(description, "Description");
   const income = await prisma.income.create({
      data: {
         amount,
         description,
         date,
         User: {
            connect: {
               userId: userIdInt
            }
         },
         Category: {
            connect: {
               categoryId: categoryId
            }

         }
      }
   }
   )
   res.json(income)

}

export const createExpense = async (req, res) => {
   const { amount, description, date, categoryId, userId } = req.body
   const userIdInt = parseInt(userId);
   const expense = await prisma.expense.create({
      data: {
         amount,
         description,
         date,
         User: {
            connect: {
               userId: userIdInt
            }
         },
         Category: {
            connect: {
               categoryId: categoryId
            }
         }
      }
   }
   )
   res.json(expense)
}

export const getAllExpenses = async (req, res) => {
   const userId = parseInt(req.query.userId);
   const expenses = await prisma.expense.findMany({
      where: {
         userId: userId
      },
      include: {
         Category: true
      }

   })
   res.json(expenses)
}

export const getAllIncomes = async (req, res) => {
   const userId = parseInt(req.query.userId)
   const incomes = await prisma.income.findMany(
      {
         where: {
            userId: userId
         },
         include: {
            Category: true
         }
      }
   )
   res.json(incomes)
}
