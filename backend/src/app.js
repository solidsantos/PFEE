import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { adminMiddleware } from './middlewares/adminMiddleware.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Sistema de Gestão de Eventos'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use(
  '/api',
  registrationRoutes
);

export default app;