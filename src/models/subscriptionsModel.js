import { Schema } from "mongoose";

 const subscriptionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    subscribedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    });


    export const Subscription = model("Subscription", subscriptionSchema);