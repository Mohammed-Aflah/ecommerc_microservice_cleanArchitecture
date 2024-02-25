import { IUserInteractor } from "../intefaces/IUserInteractor";
import { Request, Response, NextFunction } from "express";

export class UserController {
  private interactor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.interactor = interactor;
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { user, token } = await this.interactor.createUser(body);

      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { user, token } = await this.interactor.loginUser(body);
      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}
