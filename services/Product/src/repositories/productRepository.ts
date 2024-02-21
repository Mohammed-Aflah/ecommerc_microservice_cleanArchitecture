import { Product } from "../entities/Product";
import productModel from "../infrastructure/database/mongodb/Schema/productModel";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
  async getAllProduct(limit: number): Promise<Product[]> {
    try {
      const allProduct = await productModel.find().limit(limit).lean();
      const products: Product[] = allProduct.map((product: any) => ({
        status: product.status || false,
        description: product.description || "",
        quantity: product.quantity || 0,
        price: product.price || 0,
        productName: product.productName || "",
        // Add other properties as needed
      }));
      return products;
    } catch (error: any | Error) {
      throw new Error(error);
    }
  }
  async getSpecificProduct(id: string): Promise<Product | any> {
    const product = await productModel.findById(id);
    return product?.toObject();
  }
}
