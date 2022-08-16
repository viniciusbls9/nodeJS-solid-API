import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const getUserById = this.usersRepository.findById(user_id);

    if (!getUserById) {
      throw new Error("User id not found");
    }

    this.usersRepository.turnAdmin(getUserById);
    return getUserById;
  }
}

export { TurnUserAdminUseCase };
