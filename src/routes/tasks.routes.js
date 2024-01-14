import { Router } from "express";
import { validateAuth } from "../middlewares/validateToken.js";
import { createTask, deleteTask, getTasks, getTask, updateTask } from "../controllers/tasks.controller.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const router = Router();

router.get('/tasks', validateAuth, getTasks)

router.get('/tasks/:id', validateAuth, getTask)

router.post('/tasks', validateAuth, validateSchema(createTaskSchema), createTask)

router.delete('/tasks/:id', validateAuth, deleteTask)

router.put('/tasks/:id', validateAuth, updateTask)

export default router;