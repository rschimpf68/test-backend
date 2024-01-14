import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getTask = async (req, res) => {
    const task = await prisma.task.findFirst({
        where: {
            taskId: parseInt(req.params.id)
        },
        include: {
            author: true
        }
    });

    if (!task) res.status(401).json({ message: "Task not found" })
    res.json(task)
}

export const getTasks = async (req, res) => {
    console.log(req.user)
    const tasks = await prisma.task.findMany({
        where: {
            authorId: req.user.id
        },
        include: {
            author: true
        }
    });

    if (!tasks) res.status(401).json({ message: "Couldn't get tasks" });
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    try {
        const newTask = await prisma.task.create({
            data: {
                title: title,
                description: description,
                date: date,
                authorId: parseInt(req.user.id)
            }
        });

        res.json(newTask);
    } catch (error) {
        res.status(401).json({ message: error })
    }
}

export const deleteTask = async (req, res) => {
    const deleted = await prisma.task.delete({
        where: {
            taskId: parseInt(req.params.id)
        }
    });

    if (!deleted) res.status(401).json({ message: "Couldn't delete user" });

    res.sendStatus(204);
}

export const updateTask = async (req, res) => {
    const updated = await prisma.task.update({
        where: {
            taskId: parseInt(req.params.id)
        },
        data: {
            title: req.body.title,
            description: req.body.description
        }
    });

    if (!updated) res.status(401).json({ message: "Couldn't update task" })

    res.json(updated);
}