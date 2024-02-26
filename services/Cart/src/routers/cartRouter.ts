import { Router } from "express";
import { CartRepository } from "../repositories/cartRepository";
import { CartInteractor } from "../interactors/cartInteractor";
import { CartController } from "../controllers/CartController";
export const cartRouter = Router();

const repository = new CartRepository();
const interactor = new CartInteractor(repository);
const controller = new CartController(interactor);
cartRouter
  .route("/api/cart")
  .post(controller.addToCart.bind(controller))
  .delete(controller.removeItemFromCart.bind(controller));

cartRouter
  .route("/api/control/cart/:userId")
  .get(controller.seeAllItemFromCart.bind(controller));
