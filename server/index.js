import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';


dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors());
// console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('MongoDB Connected !!!');
    
}).catch((err)=>{
    console.log(err);
})


app.use('/server/user',userRouter);
app.use('/server/auth',authRouter);
//middleware-to handle error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
})

app.listen(3000,()=>{
    console.log('http://localhost:3000/'); 
})