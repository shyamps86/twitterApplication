
import express from 'express'
import { verifyJwt } from '../middlewares/authMiddleware.js';
import { allTweets, createTweet, deleteTweet, getAllTweets, modifyTweet } from '../controllers/tweetController.js';

const tweetRouter=express.Router();


tweetRouter.get("/",allTweets)  
  //make sure indivudal route should be declared above the middleware which should be required for rest of all routes


tweetRouter.use(verifyJwt);


tweetRouter.route("/create").post(createTweet);
tweetRouter.route("/getAllTweets").get(getAllTweets);
tweetRouter.route("/:tweetId").delete(deleteTweet).patch(modifyTweet);



export  {tweetRouter}