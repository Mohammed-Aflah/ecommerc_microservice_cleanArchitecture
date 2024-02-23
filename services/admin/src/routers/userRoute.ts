import { Router } from "express";
import { UserController } from "../controllers/user/userController";
import { UserRepository } from "../repositories/userRepo";
import { UserInteractor } from "../interactor/user/userInteractor";

const userRouter = Router();
const userRepo = new UserRepository();
const userInteractor = new UserInteractor(userRepo);
const userController = new UserController(userInteractor);
userRouter
  .route("/getAllusers")
  .get(userController.getAllUsers.bind(userController));
userRouter
  .route("/getOneuser/:userId")
  .get(userController.getOneUser.bind(userController));
userRouter
  .route("/blockunblock/:userId")
  .put(userController.blockAndUnblock.bind(userController));

export default userRouter;
