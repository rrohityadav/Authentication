import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import {UserRole} from "../common/enum";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, default: UserRole.user },
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
export default mongoose.model('User', userSchema);