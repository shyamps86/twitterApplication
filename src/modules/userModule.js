import mongoose, { Schema } from "mongoose";

const userModelSchema=new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

export const User=mongoose.model("User",userModelSchema)