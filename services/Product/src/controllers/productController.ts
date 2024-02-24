import { Request, Response } from "express";
import { IProductInteractor } from "../interfaces/IProductInteractor";
export class ProductController {
  private interactor: IProductInteractor;
  constructor(interactor: IProductInteractor) {
    this.interactor = interactor;
  }
  async getAllProduct(req: Request, res: Response) {
    try {
      const limit: number = Number(req.query?.limit);
      const products = await this.interactor.getAllProducts(limit);
      res.json({ status: true, products, message: "Successfull" });
    } catch (err: Error | any) {
      res.status(500).json({ status: false, err: err.message });
    }
  }

  async getSpecificProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await this.interactor.getOneProduct(productId);
      
      res.json({ status: true, product });
    } catch (err: Error | any) {
      res.status(500).json({ status: false, err: err.message });
    }
  }
}
