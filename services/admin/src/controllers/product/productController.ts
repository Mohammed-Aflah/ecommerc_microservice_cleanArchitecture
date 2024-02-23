import { Request, Response } from "express";
import { IProductInteractor } from "../../interfaces/interactors_interfaces/IProductInteractor";

export class ProductController {
  private productInteractor: IProductInteractor;
  constructor(interactor: IProductInteractor) {
    this.productInteractor = interactor;
  }
  async getAllProduct(req: Request, res: Response) {
    try {
      const allProducts = await this.productInteractor.getAllProduct();
      res.status(200).json({ status: true, products: allProducts });
    } catch (error: any | Error) {
      res.status(500).json({ status: true, err: error.message });
    }
  }

  async addProduct(req: Request, res: Response) {
    try {
      const product = await this.productInteractor.addProduct(req.body);
      res.status(200).json({ status: true, product });
    } catch (error: Error | any) {
      res.status(500).json({ status: true, err: error.message });
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await this.productInteractor.updateProduct(
        req.body,
        productId
      );
      res.status(200).json({ status: true, product });
    } catch (error: Error | any) {
      res.status(500).json({ status: true, err: error.message });
    }
  }
  async getOneProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await this.productInteractor.getSpecificProduct(
        productId
      );
      res.status(200).json({ status: true, product });
    } catch (error: Error | any) {
      res.status(500).json({ status: true, err: error.message });
    }
  }
}
