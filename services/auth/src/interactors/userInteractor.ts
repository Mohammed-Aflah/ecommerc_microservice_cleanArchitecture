import { Auth } from "../entities/Auth";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { IAuthRepository } from "../interfaces/IUserRepository";
import { generateToken } from "../utils/jwt/generateToken";
export class AuthInteractor implements IAuthInteractor {
  private repository: IAuthRepository;
  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }
  async singUp(body: Auth): Promise<{ user: Auth; token: string }> {
    const { user } = await this.repository.signUp(body);
    const token = generateToken({
      userId: user?._id?.toString() ?? "",
      rol: "user",
    });
    return { user, token };
  }
  async login(
    body: any
  ): Promise<{ user: Auth; token: string; rol: "admin" | "user" }> {
    const { user, rol } = await this.repository.login(body);
    const token = generateToken({
      userId: user._id?.toString() ?? "",
      rol: "admin",
    });

    return { user, token, rol };
  }
}
