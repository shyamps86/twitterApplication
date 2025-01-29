import { Router } from "express";
import { Register } from "../controllers/userController.js";

const userRouter=Router();

userRouter.route("/register").post(Register);

export {userRouter}