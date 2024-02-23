import { User } from "../../entities/User.entity";

export interface IUserRepository {
  getAllUsers(limit: number): Promise<User[]>;
  getSpecificUser(id: string): Promise<User>;
  blockAndUnblockUser(id: string): Promise<User>;
}
