import { ObjectId } from "mongoose";
import {UserRole} from "./enum";
export interface IUser {
    _id: ObjectId
    name: string
    username: string
    email: string
    password: string
    role: UserRole,
}


export interface TokenPayload {
    id:ObjectId
    username:string
    email:string
    role:string
}

