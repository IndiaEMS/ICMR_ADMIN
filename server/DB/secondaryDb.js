// // server/db/primaryDb.js
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const mongoURL = process.env.NEW_MONGO_URL;

// mongoose.createConnection(mongoURL);

// mongoose.connection.on('connected', () => {
//   console.log('Secondary database connected...');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Secondary DB connection error:', err);
// });

// export default mongoose;
