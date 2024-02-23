import { Product } from "../../entities/ProductEntity";
import { IProductInteractor } from "../../interfaces/interactors_interfaces/IProductInteractor";
import { IProductRepository } from "../../interfaces/repo_interaces/IProductRepository";

export class ProductInteractor implements IProductInteractor {
  private productRepository: IProductRepository;
  constructor(repository: IProductRepository) {
    this.productRepository = repository;
  }
  async addProduct(body: Product): Promise<Product> {
    return await this.productRepository.addProduct(body);
  }
  async updateProduct(body: Product, id: string): Promise<Product> {
    return await this.productRepository.updateProduct(body, id);
  }
  async getAllProduct(): Promise<Product[]> {
    return await this.productRepository.getAllProduct();
  }
  async getSpecificProduct(id: string): Promise<Product> {
    return this.productRepository.getSpecificProduct(id);
  }
}
