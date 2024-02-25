import { User } from "../entities/User.entity";
import userModel from "../infrastructure/databases/mongodb/Schema/userModel";
import { IUserRepository } from "../interfaces/repo_interaces/IUserRepository";

export class UserRepository implements IUserRepository {
  async getAllUsers(limit: number): Promise<User[] | any> {
    const allUsers = await userModel.find({role:"user"}).limit(limit);
    return allUsers;
  }
  async getSpecificUser(id: string): Promise<User | any> {
    const specificUser = await userModel.findById(id);
    
    return specificUser?.toObject();
  }
  // async blockAndUnblockUser(id: string): Promise<User> {
  //   let user = await userModel.findOne({ _id: id });
  //   if (user) {
  //     user.status = !user?.status;
  //     user?.save();
  //   }
  //   user = await userModel.findOne({ _id: id });
  //   if (user) {
  //     return user?.toObject();
  //   } else {
  //     throw Error("something went wrong");
  //   }
  // }
  async createUser(body: User): Promise<User> {
    const newUser = new userModel({
      _id: body._id,
      name: body.name,
      password: body.password,
      email: body.email,
      role: "user",
    });
    await newUser.save();
    return newUser.toObject();
  }
  async blockUser(id: string): Promise<User> {
    let user = await userModel.findOne({ _id: id });
    if (user) {
      user.status = false;
      user?.save();
    }
    user = await userModel.findOne({ _id: id });
    if (user) {
      return user?.toObject();
    } else {
      throw Error("something went wrong");
    }
  }
  async unblockUser(id: string): Promise<User> {
    let user = await userModel.findOne({ _id: id });
    if (user) {
      user.status = true;
      user?.save();
    }
    user = await userModel.findOne({ _id: id });
    if (user) {
      return user?.toObject();
    } else {
      throw Error("something went wrong");
    }
  }
}
