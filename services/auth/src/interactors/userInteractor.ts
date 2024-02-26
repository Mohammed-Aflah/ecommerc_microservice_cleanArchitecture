import { Auth } from "../entities/Auth";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { IAuthRepository } from "../interfaces/IUserRepository";
import { generateToken } from "../utils/jwt/generateToken";
export class AuthInteractor implements IAuthInteractor {
  private repository: IAuthRepository;
  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }
  //   ____________________________________________________________________________
  //
  //   User Signup Or User registration
  //   ____________________________________________________________________________
  async singUp(body: Auth): Promise<{ user: Auth; token: string }> {
    const { user } = await this.repository.signUp(body);
    const token = generateToken({
      _id: user?._id?.toString() ?? "",
      rol: "user",
    });
    return { user, token };
  }

  //   ____________________________________________________________________________
  //
  //   User and admin login
  //   ____________________________________________________________________________

  async login(
    body: any
  ): Promise<{ user: Auth; token: string; rol: "admin" | "user" }> {
    const { user, rol } = await this.repository.login(body);
    const token = generateToken({
      _id: user._id?.toString() ?? "",
      rol: "admin",
    });

    return { user, token, rol };
  }

  //   ____________________________________________________________________________
  //
  //   handling block and unblock user
  //   ____________________________________________________________________________
  async blockAndUnblock(body: {
    id: string;
    status: boolean;
  }): Promise<{ user: Auth; status: boolean }> {
    const { user, status } = await this.repository.blockAndUnblock(body);
    return { user, status };
  }
}
