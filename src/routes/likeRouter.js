import { Router } from "express";
import {  deleteLikeHandler, getAllUserLikes,createTweet } from "../controllers/likeController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";


const likeRouter=Router();

likeRouter.use(verifyJwt)
likeRouter.route("/:tweetId").post(createTweet).delete(deleteLikeHandler)
likeRouter.route("/").get(getAllUserLikes)
 // also can give 
//   likeRouter.get("/",verifyJwt,getAllUserLikes)
 



export {likeRouter}