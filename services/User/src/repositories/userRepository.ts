import { User } from "../entities/user.entities";
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
}
