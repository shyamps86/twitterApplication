import { Like } from "../models/likeModel.js";
import { Tweet } from "../models/tweetModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTweet=asyncHandler(async(req,res)=>{

    //get tweet by it's id from request parmas
    // filter tweet id present or not or else
    // update like with user like
    //send response succesfull

    const {tweetId}=req.params;

    const likedBy=req.user._id


    // console.log("likedBy-->",likedBy)

    const tweet=await Tweet.findById(tweetId);

    // console.log("tweet--->",tweet);

    if(!tweet){
        return res.status(404).json(new ApiResponse(404,"Tweet not found"))
    }
    
    const existingLike=await Like.findOne({tweet:tweetId,likedBy:likedBy})

    console.log("existingLike-->",existingLike);
    
    if(existingLike){
        return res.status(404).json(new ApiResponse(404,"already liked this tweet"))
    }
    await Like.create({tweet:tweetId,likedBy:likedBy});

    return res.status(200).json(new ApiResponse(200,"like updated"))

})



export const getAllUserLikes=asyncHandler(async(req,res)=>{
    const likedBy=req.user._id;  
    console.log("likedBy-->",likedBy);
    // const likesToTweets=await Like.find({likedBy:likedBy}).populate("tweet").select("-_id -__v -likedBy -createdAt -updatedAt -tweet._id -tweet.owner ");


    const likesToTweets=await Like.aggregate([
        {
            $match:{
                likedBy:likedBy
            }
        },
        {
            $lookup:{
                from:"tweets",
                localField:"tweet",
                foreignField:"_id",
                as:"tweetName"
            }
        },
        {
            $project:{
                "tweetName.tweet":1,
                "_id":0
            }
        },
        {
            $unwind:"$tweetName"
        },
        {
            $project:{
                "tweetName": "$tweetName.tweet",
                "_id":0
            }
        }
    ])
    // const likesToTweets=await Like.aggregate([
    //     {
    //         $project:{
    //             "likedBy":1,
    //             "tweet":1,
    //             "_id":0,
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from:"tweets",
    //             localField:"tweet",
    //             foreignField:"_id",
    //             as:"tweetName",
    //             pipeline:[
    //                 {
    //                     $project:{
    //                         "tweet":1,
    //                         "_id":0,
    //                     }
    //                 }
    //             ]
    //         },
    //     },
    //     {
    //         $addFields:{
    //             tweetName:{
    //                 $first:"$tweetName"
    //             }
    //         }
    //     },
    //     {
    //         $group:{
    //             _id:{
    //                 likedBy:"$likedBy",
    //             },
    //             tweets:{
    //                 $push:"$tweetName.tweet"
    //             }
    //         }
    //     },
    //     {
    //        $match:{

    //        }
    //     }
    //     // {
    //     //     $addFields:{
    //     //         count:{
    //     //             $size:"$tweets"
    //     //         }
    //     //     }
    //     // },
    //     // {
    //     //     $project:{
    //     //         "tweets":1,
    //     //         "_id":0,
    //     //         "count":1
    //     //     }
    //     // },
        

    // ])

    if(Array.isArray(likesToTweets) && likesToTweets.length===0 || !likesToTweets){
        return res.status(404).json(new ApiResponse(404,"No likes found"))
    }
    return res.status(200).json(new ApiResponse(200,likesToTweets,"your likes to tweets fetched",))

   

})



export const deleteLikeHandler=asyncHandler(async(req,res)=>{
    const {tweetId}=req.params;
    const likedBy=req.user._id;
    const tweet=await Tweet.findById(tweetId);

    if(!tweet){
        return res.status(404).json(new ApiResponse(404,"Tweet not found"))
    }

    const existingLike=await Like.findOne({tweet:tweetId,likedBy:likedBy});
    if(!existingLike){
        return res.status(404).json(new ApiResponse(404,"like not found"));
    }
    await Like.findOneAndDelete({tweet:tweetId,likedBy:likedBy});

    return res.status(200).json(new ApiResponse(200,"like deleted"))
})


