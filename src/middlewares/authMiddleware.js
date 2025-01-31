import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import jwt from 'jsonwebtoken'

export const verifyJwt= asyncHandler(async(req,_,next)=>{
    const token=req.header("Authorization").replace("Bearer ","") || req.cookies?.accessToken;


    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    const user=await User.findById(decodedToken._id);

    req.user=user;
    next();
})