import ProductSchema from "../../../databases/mongodb/Schemas/ProductSchema";

export class ProductConsumerActions {
  async addProdcut(body: any) {
    try {
      await ProductSchema.create(body);
    } catch (error) {
      console.log("🚀 ~ ProductConsumerActions ~ addProdcut ~ error:", error);
    }
  }

  async updateProduct(data:{id: string, body: any}) {
    try {
      await ProductSchema.updateOne({ _id: data.id }, { $set: data.body });
    } catch (error) {
      console.log(
        "🚀 ~ ProductConsumerActions ~ updateProduct ~ error:",
        error
      );
    }
  }

  async deleteProduct(data:{_id: string}) {
    try {
        await ProductSchema.updateOne({_id:data._id},{$set:{status:false}})
    } catch (error) {
      console.log(
        "🚀 ~ ProductConsumerActions ~ deleteProduct ~ error:",
        error
      );
    }
  }
}
