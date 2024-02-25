import { User } from "../../entities/User.entity";

export interface IUserRepository {
  getAllUsers(limit: number): Promise<User[]>;
  getSpecificUser(id: string): Promise<User>;
  blockUser(id: string): Promise<User>;
  unblockUser(id:string):Promise<User>;
  createUser(body: User): Promise<User>;
}
