import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const verifyIfUserIsAdmin = this.usersRepository.findById(user_id);

    if (!verifyIfUserIsAdmin.admin || !verifyIfUserIsAdmin) {
      throw new Error("User isn't admin or not exists");
    }

    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
