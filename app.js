// import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser';
import { userRouter } from './src/routes/userRouter.js';
import { ErrorMiddleware } from './src/utils/errorMiddleware.js';
import { tweetRouter } from './src/routes/tweetRouter.js';
import { likeRouter } from './src/routes/likeRouter.js';
const app=express();
// dotenv.config({
//     path:'./env'
// })
app.use(express.json({limit:"20kb"}));
app.use(cookieParser())

app.use(express.urlencoded({extended:true}));


app.use(ErrorMiddleware)

app.use("/user",userRouter);
app.use("/tweets",tweetRouter)
app.use("/likes",likeRouter)


export {app}