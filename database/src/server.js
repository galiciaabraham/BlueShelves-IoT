import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:8081', 
  'http://localhost:3000',
  'https://blue-shelves-iot-web-dashboard.vercel.app']; 

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Check if the origin is in the allowed list 
    if (allowedOrigins.indexOf(origin) === -1) {

      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    } else {
      callback(null, true);
    }
  
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  }
));

app.use(express.json());

// Apply API key middleware to all routes
app.use(apiKeyMiddleware);

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

const allowedKeys = [process.env.API_SECRET_KEY, process.env.DASHBOARD_API_KEY, process.env.MOBILE_API_KEY];

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

if (!apiKey || !allowedKeys.includes(apiKey)) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }

  next();
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
