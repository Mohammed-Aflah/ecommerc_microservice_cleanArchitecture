
import { AddressEntity } from "../entities/addEntity";
import { User } from "../entities/user.entities";

export interface IUserInteractor {
  createUser(body: User): Promise<{ user: User; token: string }>;
  loginUser(body: any): Promise<{ user: User; token: string }>;
  blockAndUnblock(id: string, status: boolean): Promise<User>;
  addAddress(body: AddressEntity): Promise<AddressEntity>;
  getAllAddresses(limit:number,userId:string): Promise<AddressEntity[]>;
  getSpecificAddress(id: string,userId:string): Promise<AddressEntity>;
  updateAddress(id: string, body: AddressEntity,userId:string): Promise<AddressEntity>;
  deleteAddress(id:string,userId:string):Promise<AddressEntity>
}
