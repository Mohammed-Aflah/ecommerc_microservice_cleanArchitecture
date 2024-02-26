import { Auth } from "../entities/Auth";

export interface IAuthInteractor {
  singUp(body: Auth): Promise<{ user: Auth; token: string }>;
  login(body: any): Promise<{ user: Auth; token: string,rol:"admin"|"user" }>;
  blockAndUnblock(body:{id:string,status:boolean}):Promise<{user:Auth,status:boolean}>
}
