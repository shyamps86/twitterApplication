import { Router } from "express";
import { Register, userLogin, userLogout } from "../controllers/userController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const userRouter=Router();

userRouter.route("/register").post(Register);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").post(verifyJwt,userLogout)

export {userRouter}




