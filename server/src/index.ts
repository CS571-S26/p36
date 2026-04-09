import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { syncChampions } from './services/ddragon';
import championRoutes from './routes/champions';
import compRoutes from './routes/posts';
import cors from 'cors';

// reads .env file and loads values into process.env
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/champions', championRoutes);
app.use('/api/comps', compRoutes);

const start = async () => {
  await connectDB(); // connects to db before running server
  await syncChampions();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

start();