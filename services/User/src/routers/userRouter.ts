import express from "express";
import { UserController } from "../controllers/UserController";
import { UsreInteractor } from "../interactors/UserInteractor";
import { UserRepository } from "../repositories/userRepository";
import { AuthMiddleware } from "../middlewares/authentication";
import { checkingAccess } from "../middlewares/accessChecking";
const userRouter = express.Router();

const repository = new UserRepository();
const interactor = new UsreInteractor(repository);
const controller = new UserController(interactor);

// userRouter.post("/creat", controller.createUser.bind(controller));
// userRouter.post("/login", controller.loginUser.bind(controller));
userRouter
  .route("/addresses/:userId/:addressId")
  .put(
    AuthMiddleware,
    checkingAccess,
    controller.updateAddress.bind(controller)
  )
  .get(
    AuthMiddleware,
    checkingAccess,
    controller.getSpcificAddress.bind(controller)
  )
  .delete(
    AuthMiddleware,
    checkingAccess,
    controller.deleteAddress.bind(controller)
  );
userRouter.get(
  "/getAlladdresses/:userId",
  AuthMiddleware,
  checkingAccess,
  controller.getAlladdresses.bind(controller)
);
userRouter.post(
  "/addAddress/:userId",
  AuthMiddleware,
  checkingAccess,
  controller.addAddresses.bind(controller)
);

export default userRouter;
