import { AddressEntity } from "../entities/addEntity";
import { User } from "../entities/user.entities";
import Address from "../infrastructure/mongodb/Schema/Address";
import UserDb from "../infrastructure/mongodb/Schema/UserSchema";
import { IUserRepository } from "../intefaces/IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser(body: User): Promise<User> {
    const useExist = await UserDb.findOne({ email: body.email });
    if (useExist) {
      throw new Error("User Already Exists with this email");
    }
    const newUser = await new UserDb({
      _id: body._id,
      name: body?.name,
      email: body?.email,
      password: body?.password,
      role: "user",
    }).save();
    return newUser.toObject() as User;
  }
  async loginUser(body: any): Promise<User> {
    const userAlreadyLogged = await UserDb.findOne({ email: body?.email });
    if (!userAlreadyLogged) throw new Error("User not found");
    if (body.password !== userAlreadyLogged.password)
      throw new Error("Incorrect email or password");
    return userAlreadyLogged.toObject();
  }
  async blockAndUnblock(id: string, status: boolean): Promise<User> {
    const newUser = await UserDb.findById(id);
    console.log("🚀 ~ UserRepository ~ blockAndUnblock ~ newUser:", newUser);

    if (!newUser) {
      throw new Error("user not found");
    }
    newUser.status = status;
    newUser.save();
    return newUser.toObject();
  }

  // _________________________________________________________________
  //
  // Address Controlling
  // _________________________________________________________________

  async addAddress(body: AddressEntity): Promise<AddressEntity> {
    const newAddress = new Address(body);
    await newAddress.save();
    return newAddress.toObject();
  }
  async getAllAddresses(
    limit: number,
    userId: string
  ): Promise<AddressEntity[] | any> {
    const addresses = await Address.find({ userId, status: true }).limit(limit);
    return addresses;
  }
  async getSpecificAddress(id: string, userId: string): Promise<AddressEntity> {
    const address = await Address.findOne({ _id: id, userId });
    if (address) {
      return address?.toObject();
    } else {
      throw new Error("Address not found");
    }
  }
  async updateAddress(
    id: string,
    body: AddressEntity,
    userId: string
  ): Promise<AddressEntity> {
    await Address.updateOne({ _id: id }, { $set: body });
    const updated = await Address.findOne({ _id: id });
    if (updated) {
      return updated?.toObject();
    } else {
      throw new Error("Something went wrong");
    }
  }
  async deleteAddress(id: string, userId: string): Promise<AddressEntity> {
    await Address.updateOne({ _id: id }, { $set: { status: false } });
    const deletedAddress = await Address.findById(id);
    if (deletedAddress) {
      return deletedAddress.toObject();
    } else {
      throw new Error("Something went wrong");
    }
  }
}
