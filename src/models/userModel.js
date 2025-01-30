import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { applyPlugin } from "../plugins/plugin.js";
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
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true
})

userModelSchema.plugin(applyPlugin,{name:"pspk"}) 
//parameters to applyPlugin function are the other parameter {name:pspk}


userModelSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const hashedPassword=await bcrypt.hash(this.password,10);
    this.password=hashedPassword
    // console.log(hashedPassword);
    next();
})



userModelSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userModelSchema.methods.generateRefreshToken=function(){

    return jwt.sign({
        _id:this._id,
        userName:this.userName,
        password:this.password,
        email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:'1d'
    }
  
  )
}
userModelSchema.methods.generateAccessToken=function(){

    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:'10d'
    }
  
  )
}

export const User=mongoose.model("User",userModelSchema)