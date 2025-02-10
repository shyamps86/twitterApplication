import mongoose ,{ model, Schema } from "mongoose";

const likedSchema=new Schema({
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
    }
},{timestamps:true})

export const Like=model("Like",likedSchema);