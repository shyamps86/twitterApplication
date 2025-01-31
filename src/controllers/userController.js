import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudiary.js";

export const Register = asyncHandler(async (req, res) => {
  //validate users data
  //check all fields are present or not
  //check user is existed or not

  //send response as user created

        const { fullName, password, email, userName, phn } = req.body;

        if (
            [fullName, userName, email, password].some((value) => value.trim() === "")
        ) {
            throw new ApiError(400, "all fields are mandatory");
        }

        const existedUser = await User.findOne({
            $or: [{ userName }, { email }],
        });
        if (existedUser) {
            throw new ApiError(403, "user already existed");
        }
        // console.log("reqfiles-->",req.files);
        const profileImagePath=req.files?.profileImage[0]?.path;
        const avatarImagePath = req.files?.avatar[0]?.path;

        
        if(!profileImagePath){
            throw new ApiError(202,"profile image is required")
        }
        const profileImage = await uploadToCloudinary(profileImagePath);
        let avatarImage;
        if(req.files && Array.isArray(req.files.avatar) && req.files?.avatar.length>0){
            
            avatarImage = await uploadToCloudinary(avatarImagePath);
        }
        
        console.log("avatarImage-->",avatarImage)
        console.log("profikeimagepath-->", profileImage)
        
        await User.create({
            userName,
            password,
            email,
            fullName,
            phn,
            profileImage: profileImage?.url,
            avatar: avatarImage?.url || "",
        });

        const createdUser = await User.findOne({ email }).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            throw new ApiError(500, "something went wrong while registering");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, createdUser, "succesfully created"));
});

export const generateTokens = async (id) => {
  const user = await User.findById(id);

  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { refreshToken, accessToken };
};

export const userLogin = asyncHandler(async (req, res) => {
  const { userName, password, email } = req.body;

  const isExistedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!isExistedUser) {
    throw new ApiError("202", "user not registered");
  }
  console.log("is going inside");
  const isPasswordMatched = isExistedUser.isPasswordCorrect(password);

  if (!isPasswordMatched) {
    throw new ApiError(402, "Invalid Password");
  }

  const { refreshToken, accessToken } = await generateTokens(isExistedUser._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  const loggedInuser = await User.findById(isExistedUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        { user: loggedInuser, refreshToken, accessToken },
        "User logged in successfully"
      )
    );
});

export const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //remove the refresh token field
      },
    },
    {
      new: true,
    }
  );

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json(new ApiResponse(200, user, "User logged out"));
});
