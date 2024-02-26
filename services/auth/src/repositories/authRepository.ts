import { Auth } from "../entities/Auth";
import AuthenticationModel from "../infrastructure/database/mongodb/Schema/authSchema";
import { IAuthRepository } from "../interfaces/IUserRepository";

export class AuthRepository implements IAuthRepository {
  async signUp(body: Auth): Promise<{ user: Auth }> {
    const userExist = await AuthenticationModel.findOne({ email: body.email });
    if (userExist) {
      throw new Error("user already exists with this email");
    }
    const newUser = await new AuthenticationModel({
      email: body.email,
      name: body.name,
      password: body.password,
      role: "user",
    }).save();
    return { user: newUser.toObject() };
  }
  async login(body: any): Promise<{ user: Auth; rol: "admin" | "user" }> {
    const userData = await AuthenticationModel.findOne({ email: body.email });
    if (!userData) {
      throw new Error("user not found with this email");
    }
    if (body.password !== userData.password) {
      throw new Error("your password is incorrect");
    }
    return { user: userData.toObject(), rol: userData.role };
  }
  //   ____________________________________________________________________________
  //
  //   handling block and unblock user
  //   ____________________________________________________________________________
  async blockAndUnblock(body: {
    id: string;
    status: boolean;
  }): Promise<{ user: Auth; status: boolean }> {
    await AuthenticationModel.updateOne(
      { _id: body.id },
      {
        $set: {
          status: body.status,
        },
      }
      );
      console.log("🚀 ~ AuthRepository ~ body:", body)
    
    const userData = await AuthenticationModel.findOne({ _id: body.id });
    if (!userData) {
      throw new Error("User not found with the given _id");
    }
    return { user: userData.toObject(), status: body.status };
  }
}
