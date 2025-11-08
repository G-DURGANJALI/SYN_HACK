import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import hostelAdminRoutes from './routes/HostelAdminRoutes.js';
import workerRoutes from './routes/workerRoutes.js';


dotenv.config();

const app = express();

// Middleware

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Connect DB
connectDB();
app.use(express.json()); // <--- This is important to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Optional, for form data


app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/hostelAdmins', hostelAdminRoutes);
app.use('/api/workers', workerRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
