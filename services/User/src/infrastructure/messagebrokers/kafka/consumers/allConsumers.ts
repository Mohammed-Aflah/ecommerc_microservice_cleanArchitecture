import { User } from "../../../../entities/user.entities";
import { IUserInteractor } from "../../../../intefaces/IUserInteractor";

export class UserConsumerActions {
  private interactor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.interactor = interactor;
  }

  async createUserAction(userData: User) {
    try {
      console.log(
        "🚀 ~ UserConsumerActions ~ createUserAction ~ userData:",
        userData
      );

      const newUser = await this.interactor.createUser(userData);
      console.log(
        "🚀 ~ UserConsumerActions ~ createUserAction ~ newUser:",
        newUser
      );
    } catch (error) {
      console.log(`Error in user create consumer ${error}`);
    }
  }

  async blockAndUnblock(data: { id: string; status: boolean }) {
    try {
      const newUser = await this.interactor.blockAndUnblock(
        data.id,
        data.status
      );
      console.log(newUser);
    } catch (error) {
      console.log("🚀 ~ UserConsumerActions ~ blockAndUnblock ~ error:", error);
    }
  }
}
