import { User } from "../entities/user.entities";

export interface IUserRepository {
  signupUser(body: User): Promise<User>;
  loginUser(body: any): Promise<User>;
}
