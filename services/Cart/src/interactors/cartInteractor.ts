import { Cart } from "../entities/CartEntity";
import { ICartInteractor } from "../interfaces/ICartInteractror";
import { ICartRepository } from "../interfaces/ICartRepository";
export class CartInteractor implements ICartInteractor {
  private repository: ICartRepository;
  constructor(repository: ICartRepository) {
    this.repository = repository;
  }
  async addToCart(data: { userId: string; productId: string }): Promise<Cart> {
    const addedData = await this.repository.addToCart(data);
    return addedData;
  }
  async deleteItemfromCart(data: {
    userId: string;
    productId: string;
  }): Promise<Cart> {
    const deltedData = await this.repository.deletItem(data);

    return deltedData;
  }
  async getAllItemsinCart(userId: string): Promise<Cart[]|any> {
    const allItems = await this.repository.seeAllItem(userId);
    return allItems;
  }
}
