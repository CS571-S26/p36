import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { syncChampions } from './services/ddragon';
import championRoutes from './routes/champions';
import compRoutes from './routes/posts';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import cors from 'cors';

// reads .env file and loads values into process.env
dotenv.config();

const app = express();

app.use(cors({ 
  origin: process.env.CORS_ORIGINS?.split(',')
}));
app.use(express.json());

app.use('/api/champions', championRoutes);
app.use('/api/comps', compRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

const start = async () => {
  await connectDB(); // connects to db before running server
  await syncChampions();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

start();