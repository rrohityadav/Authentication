import User from '../models/user';
import {Request, Response} from "express";
import {generateToken} from "../utils/token";
import {IUser, TokenPayload} from "../common/interface";
import * as bcrypt from "bcrypt";

export const hello = async (req: Request, res: Response): Promise<string | any> => {
    try {
        res.status(201).json({message: 'Hello World',});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const {name, username, email, password, role} = req.body;
        const user = await User.create({name, username, email, password, role});
        res.status(201).json({message: 'User registered', user});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const {email, password} = req.body;
        const user: IUser | null = await User.findOne({email});
        if (!user) return res.status(401).json({message: 'User not found'});
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) return res.status(401).json({message: 'Invalid password'});
        const payload: TokenPayload = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        }
        const token = generateToken(payload);
        res.json({message: 'Logged in successfully', token: token});
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }

};
