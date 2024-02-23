// import { ObjectId } from "mongoose";
import { IProductInteractor } from "../../../../interfaces/IProductInteractory";

export class AddProductConsumerActions {
  private interactor: IProductInteractor;
  constructor(interactor: IProductInteractor) {
    this.interactor = interactor;
  }
  async addProduct(data: {
    description: string;
    quantity: number;
    price: number;
    productName: string;
  }) {
    try {
      const newProduct = await this.interactor.addProduct(data);
      console.log("🚀 ~ AddProductConsumerActions ~ newProduct:")
      console.log(`🚕🚓🚗((((((((((((((((()))))))))))))))))`);
      console.log("🚀 ~ AddProductConsumerActions ~ newProduct:", newProduct)

      
    } catch (error) {
      console.log(`Error in product creat consumer`);
    }
  }
}
