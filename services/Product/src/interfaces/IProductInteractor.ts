import { Product } from "../entities/Product";

export interface IProductInteractor {
  getAllProducts(limit: number): Promise<Product[]>;
  getOneProduct(id: string): Promise<Product>;
  addProduct(body: Product): Promise<Product>;
  updateProduct(
    id: string,
    body: {
      _id?: string;
      description?: string;
      quantity?: number;
      price?: number;
      productName?: string;
      status?: boolean;
    } | null
  ): Promise<Product>;
}
