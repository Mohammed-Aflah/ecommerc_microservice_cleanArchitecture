import express from "express";
import { UserController } from "../controllers/UserController";
import { UsreInteractor } from "../interactors/UserInteractor";
import { UserRepository } from "../repositories/userRepository";
const userRouter = express.Router();

const repository = new UserRepository();
const interactor = new UsreInteractor(repository);
const controller = new UserController(interactor);

// userRouter.post("/creat", controller.createUser.bind(controller));
// userRouter.post("/login", controller.loginUser.bind(controller));
userRouter
  .route("/addresses/:userId/:addressId")
  .put(controller.updateAddress.bind(controller))
  .get(controller.getSpcificAddress.bind(controller))
  .delete(controller.deleteAddress.bind(controller));
userRouter.get(
  "/getAlladdresses/:userId",
  controller.getAlladdresses.bind(controller)
);
userRouter.post(
  "/addAddress/:userId",
  controller.addAddresses.bind(controller)
);

export default userRouter;
