import { NextFunction, Request, Response } from "express";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";

export class AuthController {
  private interactor: IAuthInteractor;
  constructor(interactor: IAuthInteractor) {
    this.interactor = interactor;
  }
  async signUp(req: Request, res: Response) {
    try {
      const body = req.body;
      const { user, token } = await this.interactor.singUp(body);
      res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      res.status(200).json({ user, token });
    } catch (error: Error | any) {
      res.status(500).json({ err: error?.message, status: false });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const body = req.body;
      const { user, token, rol } = await this.interactor.login(body);
      res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24});
      res.status(200).json({ user, token, message: `${rol} logged` });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, err: error.message });
    }
  }
  logout(_: Request, res: Response) {
    try {
      res.clearCookie("token")
      res.status(200).json({ status: true, message: "Logout successfull" });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, err: error.message });
    }
  }
}
