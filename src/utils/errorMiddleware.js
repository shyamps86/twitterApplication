import { ApiError } from "./ApiError.js"

export const ErrorMiddleware=(error,req,res,next)=>{
    if(error instanceof ApiError){
        res.send(error.statusCode).json({
            message:error.message
        })
        next();
    }
    else{
        res.send(400).json({message:"error"});
    }
}