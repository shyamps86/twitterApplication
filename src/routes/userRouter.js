import { Router } from "express";
import {
  Register,
  userLogin,
  userLogout,
} from "../controllers/userController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  Register
);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").post(verifyJwt, userLogout);

export { userRouter };
