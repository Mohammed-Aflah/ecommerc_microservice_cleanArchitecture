import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthInteractor } from "../interactors/userInteractor";
import { AuthRepository } from "../repositories/authRepository";
import { unAuthenticationMiddleWare } from "../middlewares/authentication/unauthMiddleware";
const authRouter = Router();

const repository = new AuthRepository();
const interactor = new AuthInteractor(repository);
const authController = new AuthController(interactor);

authRouter.route("/signup").post(authController.signUp.bind(authController));
authRouter.route("/login").post(unAuthenticationMiddleWare,authController.login.bind(authController));
authRouter.route("/logout").get(authController.logout.bind(authController));

export default authRouter;
