import { Product } from "../../entities/ProductEntity";

export interface IProductRepository {
  addProduct(body: Product): Promise<Product>;
  updateProduct(body: Product, id: string): Promise<Product>;
  getAllProduct(): Promise<Product[]>;
  getSpecificProduct(id: string): Promise<Product>;
}
