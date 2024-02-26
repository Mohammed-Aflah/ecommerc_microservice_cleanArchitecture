import { Address } from "cluster";
import { User } from "../entities/user.entities";
import { IUserInteractor } from "../intefaces/IUserInteractor";
import { IUserRepository } from "../intefaces/IUserRepository";
import jwt from "jsonwebtoken";
import { AddressEntity } from "../entities/addEntity";
export class UsreInteractor implements IUserInteractor {
  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async createUser(body: User): Promise<{ user: User; token: string }> {
    const data = await this.repository.createUser(body);
    const token = jwt.sign({ userId: data._id }, "secret", {
      expiresIn: "24h",
    });
    return { user: data, token };
  }
  async loginUser(body: any): Promise<{ user: User; token: string }> {
    const data = await this.repository.loginUser(body);
    const token = jwt.sign({ userId: data._id }, "secret", {
      expiresIn: "24h",
    });
    return { user: data, token };
  }
  async blockAndUnblock(id: string, status: boolean): Promise<User> {
    return await this.repository.blockAndUnblock(id, status);
  }

  // _____________________________________________________________

  //  Address Controlling
  // _____________________________________________________________
  async addAddress(body: AddressEntity): Promise<AddressEntity> {
    const newAddress = await this.repository.addAddress(body);
    return newAddress;
  }
  async getAllAddresses(
 
    limit: number,
    userId: string
  ): Promise<AddressEntity[]> {
    const allAddress = await this.repository.getAllAddresses(
      limit,
      userId
    );
    return allAddress;
  }
  async getSpecificAddress(id: string, userId: string): Promise<AddressEntity> {
    const address = await this.repository.getSpecificAddress(id, userId);
    return address;
  }
  async updateAddress(
    id: string,
    body: AddressEntity,
    userId: string
  ): Promise<AddressEntity> {
    const updatedAddress = await this.repository.updateAddress(
      id,
      body,
      userId
    );
    return updatedAddress;
  }
  async deleteAddress(id: string, userId: string): Promise<AddressEntity> {
    const deletedAddress = await this.repository.deleteAddress(id, userId);
    return deletedAddress;
  }
}
