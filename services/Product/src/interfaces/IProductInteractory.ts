import { Product } from "../entities/Product";

export interface IProductInteractor {
  getAllProducts(limit:number): Promise<Product[]>;
  getOneProduct(id: string): Promise<Product>;
}
