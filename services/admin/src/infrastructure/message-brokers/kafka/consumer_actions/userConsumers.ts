import { User } from "../../../../entities/User.entity";
import { IUserInteractor } from "../../../../interfaces/interactors_interfaces/IUserInteractor";

export class UserConsumers {
  private usertInteractor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.usertInteractor = interactor;
  }
  async createUserAction(userData: User) {
    try {
      const newUser = await this.usertInteractor.createUser(userData);
      console.log("🚀 ~ UserConsumers ~ createUserAction ~ newUser:", newUser);
    } catch (error) {
      console.log(`Error found in user crate consumer action ${error}`);
      throw error;
    }
  }
}
