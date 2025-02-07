import { model, Schema } from "mongoose";

const tweetSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    tweet:{
        type:String,
    },
})


export const Tweet=model("Tweet",tweetSchema);
