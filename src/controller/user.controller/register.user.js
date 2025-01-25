import { asyncHandler } from "../../utils/asyncHandler.js"

export const Register=asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"success"
    })
})
