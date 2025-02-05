import { Schema } from "mongoose";

const tweetSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
    
})

