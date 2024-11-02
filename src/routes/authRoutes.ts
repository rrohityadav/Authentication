import  express from 'express';
import {hello, login, register} from "../controllers/authentication.Controller";
import {authMiddleware, authorize} from "../middlewares/authMiddleware";
import {Request,Response} from "express";

const router = express.Router();
router.get('/hello',hello)
router.post('/register', register);
router.post('/login', login);
router.get('/admin', authMiddleware, authorize(['admin']), (req:Request, res:Response) => {
    res.json({ message: 'Welcome, Admin!' });
});

export default router;
