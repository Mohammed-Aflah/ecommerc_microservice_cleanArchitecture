import { IAuthInteractor } from "../../../../interfaces/IAuthInteractor";

export class UserUnblockAction {
  private interactor: IAuthInteractor;
  constructor(interactor: IAuthInteractor) {
    this.interactor = interactor;
  }
  async blockAction({ _id, payload }: { _id: string; payload: boolean }) {
    try {
      const {user,status} = await this.interactor.blockAndUnblock({ _id, payload });
      
      console.log("🚀 ~ UserUnblockAction ~ blockAction ~ status:", status)
      console.log('block action called');
      console.log("🚀 ~ UserUnblockAction ~ blockAction ~ user:", user)
      
      
    } catch (error: any | Error) {
      console.log(`Error in user blocking ${error.message}`);
    }
  }
}
