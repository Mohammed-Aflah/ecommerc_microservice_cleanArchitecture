import { IAuthInteractor } from "../../../../interfaces/IAuthInteractor";

export class UserUnblockAction {
  private interactor: IAuthInteractor;
  constructor(interactor: IAuthInteractor) {
    this.interactor = interactor;
  }
  async blockAction({ id, status }: { id: string; status: boolean }) {
    try {
      console.log(status,"🚀 ~ UserUnblockAction ~ blockAction ~ status:",id)
      const {user} = await this.interactor.blockAndUnblock({ id, status });
      
      console.log('block action called');
      console.log("🚀 ~ UserUnblockAction ~ blockAction ~ user:", user)
      
      
    } catch (error: any | Error) {
      console.log(`Error in user blocking ${error.message}`);
    }
  }
}
