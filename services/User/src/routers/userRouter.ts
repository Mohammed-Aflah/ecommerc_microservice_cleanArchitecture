import express from "express";
import { UserController } from "../controllers/UserController";
import { UsreInteractor } from "../interactors/UserInteractor";
import { UserRepository } from "../repositories/userRepository";
const userRouter = express.Router();

const repository = new UserRepository();
const interactor = new UsreInteractor(repository);
const controller = new UserController(interactor);

userRouter.post("/signup", controller.signupUser.bind(controller));
userRouter.post("/login", controller.loginUser.bind(controller));

export default userRouter