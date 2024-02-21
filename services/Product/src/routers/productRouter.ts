import express from "express";
import { ProductController } from "../controllers/productController";
import { ProductInteractor } from "../interactors/productInteractor";
import { ProductRepository } from "../repositories/productRepository";
const productRouter = express.Router();

const productRepository = new ProductRepository();
const productInteractor = new ProductInteractor(productRepository);
const productController = new ProductController(productInteractor);

productRouter
  .route("/getAllproduct")
  .post(productController.getAllProduct.bind(productController));
productRouter
  .route("/getProduct/:productId")
  .post(productController.getAllProduct.bind(productController));

export default productRouter;
