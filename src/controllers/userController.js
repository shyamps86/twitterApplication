import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"


export const Register=asyncHandler(async(req,res)=>{

    //validate users data
    //check all fields are present or not
    //check user is existed or not
    
    //send response as user created
    const {fullName,password,email,userName}=req.body;

    if([fullName,userName,email,password].some((value)=>value.trim()==="")){
        throw new ApiError(400,"all fields are mandatory");
    }

    const existedUser =await User.findOne({
        $or:[{userName},{email}]
    })
    if(existedUser){
        throw new ApiError(403,"user already existed");
    }


    await User.create({
        userName,
        password,
        email,
        fullName
    })
    
    const createdUser=await User.findOne({email}).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering");
    }

    return res.status(200).json(new ApiResponse(200,createdUser,"succesfully created"))

})

export const generateTokens=async(id)=>{
    const user=await User.findById(id);

    const refreshToken=user.generateRefreshToken();
    const accessToken=user.generateAccessToken();
    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false});

    return {refreshToken,accessToken}
}


export const userLogin=asyncHandler(async(req,res)=>{
    const {userName,password,email}=req.body;

    const isExistedUser=await User.findOne(
        {
            $or:[{userName},{email}]
        }
    )
    if(!isExistedUser){
        throw new ApiError(402,"User is not registered");
    }

    const isPasswordMatched=isExistedUser.isPasswordCorrect(password);

    if(!isPasswordMatched){
        throw new ApiError(402,"Invalid Password");
    }


    const {refreshToken,accessToken}=generateTokens(isExistedUser._id);

    const options={
        httpOnly:true,
        secure:true,
    }


    const loggedInuser=await User.findById(isExistedUser._id).select("-password -refreshToken");
    return res
    .status(200)
    .cookie("accessToken",accessToken)
    .cookie("refreshToken",refreshToken)
    .json(new ApiResponse(200,{user:accessToken,refreshToken,isExistedUser},"User logged in successfully"))
     

    




})



