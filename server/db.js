import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
  }
};

export default connectDB;
