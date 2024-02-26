import { Auth } from "../entities/Auth";

export interface IAuthRepository {
  signUp(body: Auth): Promise<{ user: Auth }>;
  login(body: any): Promise<{ user: Auth; rol: "admin" | "user" }>;
  blockAndUnblock(body: { id: string; status: boolean }):Promise<{user:Auth,status:boolean}>;
}
