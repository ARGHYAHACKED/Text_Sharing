import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import textRoutes from './routes/text.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,"https://text-sharing-nine.vercel.app","https://text-sharing-frontend.onrender.com","https://text-sharing-3.onrender.com"], // Replace with your Vercel frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies & auth headers
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/texts', textRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});