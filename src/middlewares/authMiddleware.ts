import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/user";
import {NextFunction, Request, Response} from "express";
import {IUser} from "../common/interface";

dotenv.config();

export const authMiddleware = async (req: any, res: Response, next: NextFunction):Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'No token, authorization denied'});

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? "My_Key");
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({message: 'Token is not valid'});
    }
};

export const authorize = (roles: string[]) => (req: any, res: Response, next: NextFunction):any => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({message: 'Access Denied'});
    }
    next();
};

