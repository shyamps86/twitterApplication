import { User } from "../modules/userModule.js";
import { asyncHandler } from "../utils/asyncHandler.js"


export const Register=asyncHandler(async(req,res)=>{
    const {fullName,password,email,userName}=req.body;

    await User.create({fullName,password,email,userName});
    res.send("success");
})
