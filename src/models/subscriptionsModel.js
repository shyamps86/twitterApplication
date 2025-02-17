import { Schema } from "mongoose";

 const LikedSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    likedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    });


    export const Liked = model("Liked", LikedSchema);