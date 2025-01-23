import mongoose from 'mongoose';


 export const connectDB=async()=>{
    try{
        const instanceDB=await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to database",instanceDB.connection.name);
    }
    catch(err){
        console.log("error in database connection",err);
        process.exit(1);
    }
 }