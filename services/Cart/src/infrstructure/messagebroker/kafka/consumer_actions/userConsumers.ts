import UserSchema from "../../../databases/mongodb/Schemas/UserSchema";

export class UserConsumerActions {
  async createUser(data: any) {
    try {
      await new UserSchema(data).save();
    } catch (error) {
      console.log("🚀 ~ UserConsumerActions ~ createUser ~ error:", error);
    }
  }
  async blockUser(data:{id: string, status: boolean}) {
    try {
      await UserSchema.updateOne({ _id: data.id }, { $set: { status: data.status } });
    } catch (error) {
      console.log("🚀 ~ UserConsumerActions ~ blockUser ~ error:", error);
    }
  }
}
