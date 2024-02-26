import mongoose from "mongoose";
import { Cart } from "../entities/CartEntity";
import CartSchema from "../infrstructure/databases/mongodb/Schemas/CartSchema";
import { ICartRepository } from "../interfaces/ICartRepository";
import ProductSchema from "../infrstructure/databases/mongodb/Schemas/ProductSchema";
import UserSchema from "../infrstructure/databases/mongodb/Schemas/UserSchema";

export class CartRepository implements ICartRepository {
  async addToCart(data: { userId: string; productId: string }): Promise<Cart> {
    console.log("🚀 ~ CartRepository ~ addToCart ~ data:", data);
    const userCart = await CartSchema.findOne({ userId: data.userId });
    if (userCart) {
      // product exist status
      const productExist = userCart.products.map((value: any) =>
        value?.productId.toString()
      );
      if (productExist.includes(data.productId)) {
        throw new Error("Product already exist in cart");
      }
      userCart.products.push({ productId: data.productId, qty: 1 });
      await userCart.save();

      return userCart.toObject();
    } else {
      const newCart=await new CartSchema({
        userId: data.userId,
        products: [
          {
            productId: data.productId,
            qty: 1,
          },
        ],
      }).save();
      return newCart.toObject()
    }
  }
  async deletItem(data: { userId: string; productId: string }): Promise<Cart> {
    const userCart = await CartSchema.findOne({ userId: data.userId });

    const productIdx: number | any = userCart?.products.findIndex(
      (x: any) => x?.productId.toString() === data.productId
    );
    if (productIdx && productIdx <= -1) throw new Error("produc not found");

    userCart?.products.splice(productIdx, 1);
    await userCart?.save();

    if (userCart) {
      return userCart?.toObject();
    } else {
      throw new Error("Something went wrong");
    }
  }
  async seeAllItem(userId: string): Promise<Cart[]> {
    try {
      console.log("🚀 ~ CartRepository ~ seeAllItem ~ userId:", userId)
      // Find the user's cart
      const cart = await CartSchema.findOne({ userId: userId });
  
      if (!cart) {
        throw new Error("Cart not found for the specified user.");
      }
  
      // Initialize an array to store the detailed information about each product
      const result: Cart[] = [];
  
      // Loop through each product in the cart
      for (const productEntry of cart.products) {
        // Find detailed information about the product
        const product = await ProductSchema.findById(productEntry.productId);
  
        if (!product) {
          // Handle the case where a product is not found (optional)
          console.error(`Product not found for productId: ${productEntry.productId}`);
          continue;
        }
  
        // Find the user details who added the product
        const productOwner = await UserSchema.findById(cart.userId);
  
        if (!productOwner) {
          // Handle the case where the user who added the product is not found (optional)
          console.error(`User not found for userId: ${cart.userId}`);
          continue;
        }
  
        // Create an object with detailed information and push it to the result array
        const detailedProductInfo: any = {
          _id: productEntry._id,
          quantity: productEntry.qty,
          productName: product.productName,
          description: product.description,
          price: product.price,
          status: product.status,
          images: product.images,
          ownerName: productOwner.name,
          ownerEmail: productOwner.email,
        };
  
        result.push(detailedProductInfo);
      }
  
      return result;
    } catch (error:any|Error) {
      console.error("Error:", error.message);
      throw error;
    }
  }
  
}
