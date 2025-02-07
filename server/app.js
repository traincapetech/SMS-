import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(cors({
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('yo yo');
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
