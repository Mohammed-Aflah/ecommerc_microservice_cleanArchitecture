import { Router } from "express";
import { injectDependencies } from "../utils/controller/injectdependecies";
import { ProductRepository } from "../repositories/productRepo";
import { ProductInteractor } from "../interactor/product/productInteractor";
import { ProductController } from "../controllers/product/productController";

const productRouter = Router();
const productRepo = new ProductRepository();
const productInteractor = new ProductInteractor(productRepo);
const productController = new ProductController(productInteractor);
productRouter
  .route("/api/product")
  .post(productController.addProduct.bind(productController))
  .get(productController.getAllProduct.bind(productController));
productRouter
  .route("/api/product/control/:productId")
  .put(productController.updateProduct.bind(productController))
  .get(productController.getOneProduct.bind(productController));
export default productRouter;
