import { Auth } from "../entities/Auth";

export interface IAuthRepository {
  signUp(body: Auth): Promise<{ user: Auth }>;
  login(body: any): Promise<{ user: Auth; rol: "admin" | "user" }>;
  blockAndUnblock(body: { _id: string; payload: boolean }):Promise<{user:Auth,status:boolean}>;
}
