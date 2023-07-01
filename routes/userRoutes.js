import express from "express";
import { authUser, registerUser } from "../controller/userController.js";

const userRoutes = express.Router();

//register user
userRoutes.route("/register").post(registerUser)

//login user
userRoutes.route("/login").post(authUser)

export default userRoutes;