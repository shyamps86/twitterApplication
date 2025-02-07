import { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweetModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const createTweet = asyncHandler(async (req, res) => {
  const { tweet } = req.body;
  // console.log("req user->",req.user)

  await Tweet.create({
    tweet,
    owner: req.user._id,
  });

  const findTweets = await Tweet.find({
    owner: req.user._id,
  }).select("-_id -owner"); //resulted in as array of tweets

  return res.status(200).json(new ApiResponse(200, "sucess", "tweet created"));
});

export const getAllTweets = asyncHandler(async (req, res) => {
  const getTweets = await Tweet.find().select("-owner");

  //   console.log("getTweets", getTweets)
  return res
    .status(200)
    .json(new ApiResponse(200, getTweets, "fetched tweets data"));
});

export const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  const tweet = await Tweet.findById(tweetId);
  console.log("tweet-->", tweet);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }
  await tweet.deleteOne();
  return res.status(200).json(new ApiResponse(200, "deleted"));
});

export const modifyTweet = asyncHandler(async (req, res) => {
  const { tweet } = req.body;
  const { tweetId } = req.params;
//   console.log(isValidObjectId(tweetId));   --> it creates objectId here which involvs with two object id's
  const existedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        tweet,
      },
    },
    {
      new: true,
    }
  );
//   console.log("existedTweet-->", existedTweet);
  return res.status(200).json(new ApiResponse(200, "Requested tweet changed"));
});
