import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
app.use(cors());
// console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('MongoDB Connected !!!');
    
}).catch((err)=>{
    console.log(err);
})


app.use('/server/user',userRouter);

app.listen(3000,()=>{
    console.log('http://localhost:3000/'); 
})