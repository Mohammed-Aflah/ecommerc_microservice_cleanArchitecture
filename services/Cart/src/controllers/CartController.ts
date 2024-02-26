import { Request, Response } from "express";
import { ICartInteractor } from "../interfaces/ICartInteractror";

export class CartController {
  private interactor: ICartInteractor;
  constructor(interactor: ICartInteractor) {
    this.interactor = interactor;
  }
  async addToCart(req: Request, res: Response) {
    try {
     
      
      const cartData = await this.interactor.addToCart(req.body);
      res.status(500).json({ status: true, message: "Item added", cartData });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, message: error.message });
    }
  }

  async removeItemFromCart(req: Request, res: Response) {
    try {
      const cartData = await this.interactor.deleteItemfromCart(req.body);
      res.status(500).json({ status: true, message: "Item deleted", cartData });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, message: error.message });
    }
  }

  async seeAllItemFromCart(req: Request, res: Response) {
    try {
      console.log('api calling');
      
      const { userId } = req.params;
      const cartData = await this.interactor.getAllItemsinCart(userId);
      res
        .status(500)
        .json({ status: true, message: "All items!", cart: cartData });
    } catch (error: Error | any) {
      console.log("🚀 ~ CartController ~ seeAllItemFromCart ~ error:", error)
      
      
      res.status(500).json({ status: false, message: error.message });
    }
  }
}
