// filepath: /C:/Users/nicol/6.semester/SwWao/express-demos/src/server.ts
import express from 'express';
import UserRoutes from './routes/userRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();  // Load environment variables from .env file

// Connect to MongoDB using the MONGO_URI from the .env file
mongoose.connect(process.env.MONGO_URI || 'mongodb://some-mongo:27017/myapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
// Enable CORS
app.use(cors());

// Enable logging
app.use(morgan('dev'));

// Built-in middleware
app.use(express.json());

// Application-level middleware (for testing purposes)
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Route to demonstrate user retrieval
app.get('/user/:id', (req, res) => {
  res.send('USER');
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Mounting the Routes (Router middleware)
app.use('/api', UserRoutes);
app.use('/api', ProductRoutes); 
app.use('/api', OrderRoutes);

// Generate error for demonstration purposes
// app.get('/error', (req, res) => {
//   throw new Error('Forced error');
// });

// Custom 404 handler (after all routes)
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

// Error-handling middleware (always last)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Unexpected server error');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});