import jwt from 'jsonwebtoken'
import {TokenPayload} from "../common/interface";
require('dotenv').config();

export const generateToken = (user:TokenPayload):string => {
    return jwt.sign({ id: user.id,email:user.email, role: user.role },process.env.JWT_SECRET ?? "My_Key", {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const verifyToken = async (token:string) => {
   return  jwt.verify(token,"My_Secret_Key");

};
