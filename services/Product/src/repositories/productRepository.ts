import mongoose from "mongoose";
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
  async addProduct(body: Product): Promise<Product> {
    try {
      const producNameExist = await productModel.findOne({
        productName: body.productName,
      });
      if (producNameExist) {
        throw new Error("Product already exists with this name");
      }
      const newProduct = new productModel({
        _id:new mongoose.Types.ObjectId(body._id),
        productName: body.productName,
        price: body.price,
        description: body.description,
        quantity: body.quantity,
      });
      await newProduct.save();
      return newProduct.toObject();
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
    if (!body) {
      throw new Error("Invalid update data");
    }
     await productModel.updateOne(
      { _id: id },
      { $set: body }
    );
    const updatedProduct = await productModel.findById(id);
    if (updatedProduct) {
      return updatedProduct.toObject();
    } else {
      throw new Error("Product not found after update "+id);
    }
  }
}
