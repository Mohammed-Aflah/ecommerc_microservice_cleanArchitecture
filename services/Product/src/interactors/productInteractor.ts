import { Product } from "../entities/Product";
import { IProductInteractor } from "../interfaces/IProductInteractory";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductInteractor implements IProductInteractor {
  private repository: IProductRepository;
  constructor(repository: IProductRepository) {
    this.repository = repository;
  }
  async getAllProducts(limit: number): Promise<Product[]> {
    try {
      const allProducts = await this.repository.getAllProduct(limit ?? 0);
      return allProducts;
    } catch (err: any | Error) {
      throw new Error(err);
    }
  }
  async getOneProduct(id: string): Promise<Product> {
    try {
      const specificProduct = await this.repository.getSpecificProduct(id);
      return specificProduct;
    } catch (error: any | Error) {
      throw new Error(error);
    }
  }
  async addProduct(body: Product): Promise<Product> {
    try {
      const createdProduct = await this.repository.addProduct(body);
      return createdProduct;
    } catch (error: any | Error) {
      throw new Error(error);
    }
  }
}
