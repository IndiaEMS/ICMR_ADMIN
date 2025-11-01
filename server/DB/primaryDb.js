// server/db/primaryDb.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

mongoose.connection.on('connected', () => {
  console.log('Database connected...');
});

mongoose.connection.on('error', (err) => {
  console.error('DB connection error:', err);
});

export default mongoose;
