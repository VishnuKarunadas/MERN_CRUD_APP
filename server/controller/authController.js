import { User } from "../model/userSchema.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    console.log('sign-up from backend');

    const { userName, email, password } = req.body;

    // Validate that all required fields are provided
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields (userName, email, password) are required." });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Check if the userName already exists
        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(400).json({ message: "Username already in use." });
        }

        // Hash the password before saving it
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user
        const newUser = new User({
            userName: userName,
            email: email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Return success response
        res.status(201).json({ message: "User Added Successfully!" });
    } catch (error) {
        console.error(error);
        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; // Find which field caused the duplicate error
            return res.status(400).json({ message: `${field} is already taken` });
        }

        // General error handler
        next(error); // Pass the error to the next middleware (if any)
    }
};
