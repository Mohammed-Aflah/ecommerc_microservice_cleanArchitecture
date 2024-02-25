import { User } from "../entities/user.entities";

export interface IUserInteractor {
  createUser(body: User): Promise<{user:User,token:string}>;
  loginUser(body: any): Promise<{user:User,token:string}>;
}
