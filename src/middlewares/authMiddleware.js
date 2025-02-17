import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import jwt from 'jsonwebtoken'

export const verifyJwt= asyncHandler(async(req,_,next)=>{
    const token=req.header("Authorization").replace("Bearer ","") || req.cookies?.accessToken;


    // req.header("Authorization")
    //  is an Express method that abstracts away the case sensitivity of headers.


    // req.headers["authorization"] "Authorization" always should be lowecase case sensitive
    // is the raw Node.js request headers object, without any Express-level conveniences.

    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    const user=await User.findById(decodedToken._id);

    req.user=user;
    next();
})