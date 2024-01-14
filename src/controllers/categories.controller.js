import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const createCategory = async (req, res) => {
   const { name, isOutflow, icon, userId } = req.body


   const userIdInt = parseInt(userId);
   const category = await prisma.category.create({
      data: {
         name,
         isOutflow,
         icon,
         User: {
            connect: {
               userId: userIdInt
            }
         },


      }
   }
   )
   res.json(category)
}

export const getAllCategoryIncome = async (req, res) => {
   const userId = parseInt(req.query.userId)
   const categories = await prisma.category.findMany({
      where: {
         isOutflow: false,
         userId: userId
      }
   })
   res.json(categories)
}
export const getAllCategoryExpense = async (req, res) => {
   const userId = parseInt(req.query.userId)
   const categories = await prisma.category.findMany({
      where: {
         isOutflow: true,
         userId: userId
      }
   })
   res.json(categories)
}
export const deleteCategory = async (req, res) => {
   const id = parseInt(req.query.id)
   const category = await prisma.category.delete({
      where: {
         id: id
      }
   })
   res.json(category)
}

export const updateCategory = async (req, res) => {
   const { categoryId, name, isOutflow, icon } = req.body
   const category = await prisma.category.update({
      where: {
         categoryId: parseInt(categoryId)
      },
      data: {
         name: name,
         isOutflow: isOutflow,
         icon: icon
      }
   })
   res.json(category)
}

export const getCategoryById = async (req, res) => {
   const catId = parseInt(req.query.categoryId)

   const category = await prisma.category.findUnique({
      where: {
         categoryId: catId
      }
   })
   res.json(category)
}
export const getAllCategories = async (req, res) => {
   const userId = parseInt(req.query.userId)
   const categories = await prisma.category.findMany({
      where: {
         userId: userId
      }
   })
   res.json(categories)
}