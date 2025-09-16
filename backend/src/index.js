import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import medicineRoutes from './routes/medicines.js';
import batchRoutes from './routes/batches.js';
import transactionRoutes from './routes/transactions.js';
import verifyRoutes from './routes/verify.js';
import reportRoutes from './routes/reports.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorHandler);

export default app;
