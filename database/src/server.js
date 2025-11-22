import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:8081', 'http://localhost:3000']; //Add production origins when deploying
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  }
));

app.use(express.json());

// Routes
app.use('/items', itemRoutes);
app.use('/trackings', trackingRoutes);
app.use('/users', userRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Inventory API is running 🚀');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
