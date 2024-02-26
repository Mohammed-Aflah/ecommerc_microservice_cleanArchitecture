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

  async getAlladdresses(req: Request, res: Response) {
    try {
      const { limit } = req.query;
      const { userId } = req.params;
      const addresses = this.interactor.getAllAddresses(
        Number(limit) ?? 0,
        userId
      );
      res.status(200).json({ status: true, addresses });
    } catch (error: any | Error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
  async addAddresses(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { body } = req;
      const address = await this.interactor.addAddress(body);
      res.status(200).json({ status: true, address });
    } catch (error: any | Error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
  async getSpcificAddress(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { addressId } = req.params;
      const address = await this.interactor.getSpecificAddress(
        addressId,
        userId
      );
      res.status(200).json({ status: true, address });
    } catch (error: any | Error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
  async deleteAddress(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { addressId } = req.params;
      const address = await this.interactor.deleteAddress(addressId, userId);
      res.status(200).json({ status: true, address });
    } catch (error: any | Error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
  async updateAddress(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { body } = req;
      const { addressId } = req.params;
      const address = await this.interactor.updateAddress(
        addressId,
        body,
        userId
      );
      res.status(200).json({ status: true, address });
    } catch (error: any | Error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
}
