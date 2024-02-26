import { Cart } from "../entities/CartEntity";

export interface ICartInteractor {
  addToCart(data: { userId: string; productId: string }): Promise<Cart>;
  deleteItemfromCart(data: {
    userId: string;
    productId: string;
  }): Promise<Cart>;
  getAllItemsinCart(userId:string): Promise<Cart[]>;
}
