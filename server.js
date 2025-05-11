import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import taskRoutes from './routes/tasks.js';
import habitRoutes from './routes/habits.js';
import moodRoutes from './routes/moods.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow React frontend to connect
app.use(express.json()); // Parse JSON requests

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/moods', moodRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
