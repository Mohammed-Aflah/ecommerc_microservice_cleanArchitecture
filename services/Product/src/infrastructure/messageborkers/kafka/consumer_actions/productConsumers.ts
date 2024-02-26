// import { ObjectId } from "mongoose";
import { IProductInteractor } from "../../../../interfaces/IProductInteractor";

export class AddProductConsumerActions {
  private interactor: IProductInteractor;
  constructor(interactor: IProductInteractor) {
    this.interactor = interactor;
  }

  // add product _>
  async addProduct(data: {
    _id: string;
    description: string;
    quantity: number;
    price: number;
    productName: string;
  }) {
    try {
      console.log(`
      
      🚕🚓🚗((((((((((((((((()))))))))))))))))  next -> ${data}`);
      console.log(`type ${typeof data}`);

      const newProduct = await this.interactor.addProduct(data);
      console.log("🚀 ~ AddProductConsumerActions ~ newProduct:", newProduct);
    } catch (error: any | Error) {
      console.log(`Error in product creat consumer ${error}`);
    }
  }

  // update product ->

  async updateProduct(
    id: string,
    body: {
      _id?: string;
      description?: string;
      quantity?: number;
      price?: number;
      productName?: string;
      status?: boolean;
    }
  ) {
    try {
      console.log("🚀 ~ updateProduct ~ body:", body);

      const updateProduct = await this.interactor.updateProduct(id, body);
      console.log("🚀 ~ updateProduct ***** ~ updateProduct:", updateProduct);
    } catch (error) {
      console.log(`Error in product update consumer ${error}`);
      return;
    }
  }
  async deleteProductAction(_id: string) {
    try {
      const deletedProduct = this.interactor.deleteProduct(_id);
      console.log(
        "🚀 ~ AddProductConsumerActions ~ deleteProductAction ~ deletedProduct:",
        deletedProduct
      );
    } catch (error) {
      console.log(`Error in delete product consumer`);
      return;
    }
  }
}
