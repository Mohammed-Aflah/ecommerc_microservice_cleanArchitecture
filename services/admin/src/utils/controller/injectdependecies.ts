import { ProductController } from "../../controllers/product/productController";
import { UserController } from "../../controllers/user/userController";
import { ProductInteractor } from "../../interactor/product/productInteractor";
import { UserInteractor } from "../../interactor/user/userInteractor";
import { ProductRepository } from "../../repositories/productRepo";
import { UserRepository } from "../../repositories/userRepo";

export const injectDependencies = (controller: "user" | "product") => {
  switch (controller) {
    case "user":
      const repository = new UserRepository();
      const interactor = new UserInteractor(repository);
      const userController = new UserController(interactor);
      return userController;
    case "product":
      const productRepo = new ProductRepository();
      const productInteractor = new ProductInteractor(productRepo);
      return new ProductController(productInteractor);
  }
};
