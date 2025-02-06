import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { createStream } from 'rotating-file-stream';

const app = express();

// create a rotating write stream
const accessLogStream = createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
