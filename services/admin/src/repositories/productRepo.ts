import { Product } from "../entities/ProductEntity";
import productMoel from "../infrastructure/databases/mongodb/Schema/productMoel";
import { IProductRepository } from "../interfaces/repo_interaces/IProductRepository";

export class ProductRepository implements IProductRepository {
  async addProduct(body: Product): Promise<Product> {
    const newProduct = new productMoel(body);
    await newProduct.save();
    return newProduct.toObject();
  }
  async updateProduct(body: Product, id: string): Promise<Product | any> {
    await productMoel.updateOne({ _id: id }, { $set: body });
    const newProduct = await productMoel.findById(id);
    return newProduct?.toObject();
  }
  async getAllProduct(): Promise<Product[]> {
    const allProducts = await productMoel.find({});
    return allProducts;
  }
  async getSpecificProduct(id: string): Promise<Product> {
    const product = await productMoel.findOne({ _id: id });
    if (product) {
      return product?.toObject();
    } else {
      throw Error("something went wrong");
    }
  }
  
}
