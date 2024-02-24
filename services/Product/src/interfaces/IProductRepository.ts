import { Product } from "../entities/Product";

export interface IProductRepository {
  getAllProduct(limit: number): Promise<Product[]>;
  getSpecificProduct(id: string): Promise<Product>;
  addProduct(body: Product): Promise<Product>;
  updateProduct(id:string,body:{
    _id?: string;
    description?: string;
    quantity?: number;
    price?: number;
    productName?: string;
    status?: boolean;
  }|null):Promise<Product>
}
