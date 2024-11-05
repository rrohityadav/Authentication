
import  express from 'express';
import authRoutes from "./routes/authRoutes";
import {connectDB} from "./common/config/db";
import dotenv from 'dotenv';
import {initializePassport} from "./common/config/passport.Config";
import passport from "passport";
dotenv.config();
const app =   express();
connectDB()
initializePassport();
app.use(passport.initialize());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
