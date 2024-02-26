import { Cart } from "../entities/CartEntity";

export interface ICartRepository {
  addToCart(data: { userId: string; productId: string }): Promise<Cart>;
  deletItem(data: {
    userId: string;
    productId: string;
  }): Promise<Cart>;
  seeAllItem(userId:string): Promise<Cart[]>;
}
