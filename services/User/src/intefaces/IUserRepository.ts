import { User } from "../entities/user.entities";

export interface IUserRepository {
  createUser(body: User): Promise<User>;
  loginUser(body: any): Promise<User>;
  blockAndUnblock(id: string, status: boolean): Promise<User>;
}
