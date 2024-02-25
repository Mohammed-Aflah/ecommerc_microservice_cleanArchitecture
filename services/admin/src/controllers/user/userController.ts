import { userBlockAndUnblock } from "../../infrastructure/message-brokers/kafka/producers/product/userBlockandUnblock";
import { IUserInteractor } from "../../interfaces/interactors_interfaces/IUserInteractor";
import { Request, Response } from "express";
export class UserController {
  private interactor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.interactor = interactor;
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const limit = Number(req?.query?.limit);
      const users = await this.interactor.getAllUsers(limit ?? 0);
      res.status(200).json({ status: true, users });
    } catch (error: Error | any) {
      return res.status(500).json({ status: false, err: error.message });
    }
  }

  async getOneUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await this.interactor.getSpecificUser(userId);
      console.log("🚀 ~ UserController ~ getOneUser ~ user:", user)
      
      res.status(200).json({ status: true, user:user });
    } catch (error: Error | any) {
      return res.status(500).json({ status: false, err: error.message });
    }
  }
  async blockUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await this.interactor.blockUser(userId)
      await userBlockAndUnblock({id:userId,status:false})
      res.status(200).json({ status: true, user,message:`${user.name} ${"blocked"}`,blockStatus:!user.status });
    } catch (error: Error | any) {
      return res.status(500).json({ status: false, err: error.message });
    }
  }
  async unblockUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await this.interactor.unblockUser(userId)
      await userBlockAndUnblock({id:userId,status:true})
      res.status(200).json({ status: true, user,message:`${user.name} ${"unblocked"}`,blockStatus:!user.status });
    } catch (error: Error | any) {
      return res.status(500).json({ status: false, err: error.message });
    }
  }
}
