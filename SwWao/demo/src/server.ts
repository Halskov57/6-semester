import express from 'express';
import UserRoutes from './routes/userRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();  


console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

mongoose.connect('mongodb://root:example@some-mongo:27017/mydatabase', {
  authSource: 'admin',
  user: 'root',
  pass: 'example',
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);  
  });


const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);  

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});


app.get('/user/:id', (req, res) => {
  res.send('USER');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', UserRoutes);
app.use('/api', ProductRoutes); 
app.use('/api', OrderRoutes);

app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error('Error stack:', err.stack);
  res.status(500).send('Unexpected server error');
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Example app listening on port ${PORT}`);
});


process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});


process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);  
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', promise, 'reason:', reason);
  process.exit(1);  
});