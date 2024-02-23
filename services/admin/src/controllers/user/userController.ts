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
      res.status(200).json({ status: true, user });
    } catch (error: Error | any) {
      return res.status(500).json({ status: false, err: error.message });
    }
  }
  async blockAndUnblock(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await this.interactor.blockandUnblockUsers(userId)
      res.status(200).json({ status: true, user,message:`${user.name} ${!user.status?"blocked":"unblocked"}`,blockStatus:!user.status });
    } catch (error: Error | any) {
      return res.status(500).json({ status: false, err: error.message });
    }
  }
}
