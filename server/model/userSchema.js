import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: () => uuidv4(),
        unique: true,  // Ensure that userId is unique
    },
    userName: {
        required: true,
        type: String,
        unique: true,  // Ensure that userName is unique
    },
    email: {
        required: true,
        type: String,
        unique: true,  // Ensure that email is unique
    },
    password: {
        required: true,
        type: String,
    },
    profilePicture: {
        type: String,
        default:
          'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    phone: {
        type: String,
        default: null,
    },
    dob: {
        type: String,
        default: null,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// Create a unique index for phone if you want to enforce uniqueness for phone as well
userSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $exists: true, $ne: null } } });

export const User = mongoose.model('User', userSchema);
