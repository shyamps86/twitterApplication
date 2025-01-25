import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDB } from './db/index.js'
import express from 'express';
import userRouter from './routes/user.routes/user.register.js';
const app=express();
dotenv.config({
    path:'./env'
})
app.use(express.json({limit:"20kb"}));
app.use("/user",userRouter);

app.use(express.urlencoded({extended:true}));


connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`listening at port ${process.env.PORT}`)
})