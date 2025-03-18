import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'
const userSchema = new mongoose.Schema({

    userId: {
        type: String,
        default: () => uuidv4(),  // Automatically generate UUID for each new user
        unique: true,
    },
    userName: {
        require : true,
        type: String,
        unique: true,
    },
    email: {
        require : true,
        type: String,
        unique: true,
    },
    password: {
        require : true,
        type: String,
    },
    phone: {
        type: String,
        unique: true,
        default: null,
    },
    dob: {
        type: String,
        unique: true,
        default: null,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isBlocked:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

export const User = mongoose.model('User',userSchema)