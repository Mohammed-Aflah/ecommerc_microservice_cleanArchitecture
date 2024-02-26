import { Router } from "express";
import { injectDependencies } from "../utils/controller/injectdependecies";
import { ProductRepository } from "../repositories/productRepo";
import { ProductInteractor } from "../interactor/product/productInteractor";
import { ProductController } from "../controllers/product/productController";
import { verifyAdminAuth } from "../middlewares/verifyAdmin";

const productRouter = Router();
const productRepo = new ProductRepository();
const productInteractor = new ProductInteractor(productRepo);
const productController = new ProductController(productInteractor);
productRouter
  .route("/api/product")
  .post(verifyAdminAuth, productController.addProduct.bind(productController))
  .get(
    verifyAdminAuth,
    productController.getAllProduct.bind(productController)
  );
productRouter
  .route("/api/product/control/:productId")
  .put(verifyAdminAuth, productController.updateProduct.bind(productController))
  .get(verifyAdminAuth, productController.getOneProduct.bind(productController))
  .delete(verifyAdminAuth,productController.deleteProduct.bind(productController));
export default productRouter;
