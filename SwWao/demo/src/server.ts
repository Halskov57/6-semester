import express from 'express';
import UserRoutes from './routes/userRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();  // Load environment variables from .env file

// Verify environment variables
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

// Connect to MongoDB using the MONGO_URI from the .env file
mongoose.connect('mongodb://some-mongo:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Increase timeout to 5 seconds
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);  // Exit the process if MongoDB connection fails
  });

// Create an Express application
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);  // Convert PORT to a number

// Express middleware
app.use(cors());
app.use(morgan('dev'));
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

// Custom 404 handler (after all routes)
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

// Error-handling middleware (always last)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error stack:', err.stack);
  res.status(500).send('Unexpected server error');
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);  // Exit the process on uncaught exception
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', promise, 'reason:', reason);
  process.exit(1);  // Exit the process on unhandled promise rejection
});