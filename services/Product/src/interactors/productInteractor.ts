import { Product } from "../entities/Product";
import { IProductInteractor } from "../interfaces/IProductInteractor";
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
  async updateProduct(
    id: string,
    body: {
      _id?: string;
      description?: string;
      quantity?: number;
      price?: number;
      productName?: string;
      status?: boolean;
    } | null
  ): Promise<Product> {
    try {
      const updateProduct = await this.repository.updateProduct(id, body);
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(_id: string): Promise<Product> {
    const deleteProduct = await this.repository.deleteProduct(_id);
    return deleteProduct;
  }
}
