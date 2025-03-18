import { User } from "../model/userSchema.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req,res)=>{

    const {userName,email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({userName, email, password: hashedPassword})//after ES6 if key and value is same no need to write the key and value togather eg,userName,email, but password is diffrent
    try {
        await newUser.save()
        res.status(201).json({message:"User Added Successfully!!"})
    } catch (error) {
        res.status(500).json(error.message)
    }
   
}