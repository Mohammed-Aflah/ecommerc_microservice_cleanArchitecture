import { Router } from "express";
import { UserController } from "../controllers/user/userController";
import { UserRepository } from "../repositories/userRepo";
import { UserInteractor } from "../interactor/user/userInteractor";
import { verifyAdminAuth } from "../middlewares/verifyAdmin";

const userRouter = Router();
const userRepo = new UserRepository();
const userInteractor = new UserInteractor(userRepo);
const userController = new UserController(userInteractor);
userRouter
  .route("/getAllusers")
  .get(verifyAdminAuth,userController.getAllUsers.bind(userController));
userRouter
  .route("/getOneuser/:userId")
  .get(verifyAdminAuth,userController.getOneUser.bind(userController));
userRouter
  .route("/block/:userId")
  .put(verifyAdminAuth,userController.blockUser.bind(userController));
userRouter
  .route("/unblock/:userId")
  .put(verifyAdminAuth,userController.unblockUser.bind(userController));

export default userRouter;
