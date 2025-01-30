import express from "express";
import { LoginUser, RegisterUser } from "../controller/UserController.js";

const UserRouter = express.Router();

// Route for user registration
UserRouter.post("/register", RegisterUser);

// Route for user login
UserRouter.post("/login", LoginUser);

export default UserRouter;
