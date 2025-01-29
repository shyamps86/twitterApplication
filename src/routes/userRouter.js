import { Router } from "express";
import { Register, userLogin } from "../controllers/userController.js";

const userRouter=Router();

userRouter.route("/register").post(Register);
userRouter.route("/login").post(userLogin);

export {userRouter}




