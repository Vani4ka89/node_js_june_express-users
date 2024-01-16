import {model, Schema} from "mongoose";
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        selected: false
    }
}, {
    versionKey: false,
    timestamps: true
})

export const User = model<IUser>('user', userSchema);