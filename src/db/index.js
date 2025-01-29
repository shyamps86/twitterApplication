import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const instanceDB = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to database: ${instanceDB.connection.name}`);
    } catch (err) {
        console.error("Error in database connection", err);
        process.exit(1); 
    }
};
