import { Product } from "../entities/Product";

export interface IProductRepository {
  getAllProduct(limit:number): Promise<Product[]>;
  getSpecificProduct(id: string): Promise<Product>;
}
