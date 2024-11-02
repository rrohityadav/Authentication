
import  express from 'express';
import authRoutes from "./routes/authRoutes";
import {connectDB} from "./config/db";
import dotenv from 'dotenv';
dotenv.config();

connectDB()
const app =   express();
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
