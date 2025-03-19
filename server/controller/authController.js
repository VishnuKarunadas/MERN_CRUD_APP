import { User } from "../model/userSchema.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email:email})
        if(!validUser)return next(errorHandler(404,'User not Found!'));
        if (validUser.isBlocked) return next(errorHandler(403, 'User is blocked'));

        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword)return next(errorHandler(401,'Invaild credentials'));

        const token = jwt.sign(
            {
                id:validUser._id,
                isAdmin: validUser.isAdmin
            },
            process.env.JWT_SECRET
        );
        const { password: hashedPassword, ...rest } = validUser._doc;//remove password from jwt   ._doc destructure the unwanted data from db
        const expiryDate = new Date(Date.now() + 3600000);

        res
           .cookie('access_token',token,{httpOnly: true, expires: expiryDate })
           .status(200)
           .json({
            ...rest,
            token 
          });
        
    } catch (error) {
        next(error)
    }
};

export const signout = (req, res) => {
    res.clearCookie('access_token');
    localStorage.removeItem('token'); 
    res.status(200).json('Signout success!');
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                userName: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
            console.log('OAuth backed');
        }
    } catch (error) {
        next(error)
    }
}
