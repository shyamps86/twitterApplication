
import express from 'express'
import { verifyJwt } from '../middlewares/authMiddleware.js';
import { createTweet, deleteTweet, getAllTweets, modifyTweet } from '../controllers/tweetController.js';

const tweetRouter=express.Router();



tweetRouter.use(verifyJwt);


tweetRouter.route("/create").post(createTweet);
tweetRouter.route("/getAllTweets").get(getAllTweets);
tweetRouter.route("/:tweetId").delete(deleteTweet).patch(modifyTweet);

export  {tweetRouter}