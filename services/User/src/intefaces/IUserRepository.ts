import { Address } from "cluster";
import { User } from "../entities/user.entities";
import { AddressEntity } from "../entities/addEntity";

export interface IUserRepository {
  createUser(body: User): Promise<User>;
  loginUser(body: any): Promise<User>;
  blockAndUnblock(id: string, status: boolean): Promise<User>;
  addAddress(body: AddressEntity): Promise<AddressEntity>;
  getAllAddresses(limit:number,userId:string): Promise<AddressEntity[]>;
  getSpecificAddress(id: string,userId:string): Promise<AddressEntity>;
  updateAddress(id: string, body: AddressEntity,userId:string): Promise<AddressEntity>;
  deleteAddress(id:string,userId:string):Promise<AddressEntity>
}
