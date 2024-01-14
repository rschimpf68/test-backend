

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import categoryRoutes from './routes/category.routes.js'
import transactionsRoutes from './routes/transactions.routes.js'

import authRoutes from './routes/auth.routes.js'
import pagesRouter from './routes/pages.routes.js'

import taskRoutes from './routes/tasks.routes.js'
import { validateAuth } from './middlewares/validateToken.js';

const corsOptions = {
   origin: true, //included origin as true
   credentials: true, //included credentials as true

};

const app = express();

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.use('/api', authRoutes);
app.use('/api', pagesRouter);
app.use('/api', categoryRoutes);
app.use('/api', transactionsRoutes);
app.use('/api', validateAuth, taskRoutes);

export default app;