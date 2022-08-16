import { v4 as uuidV4 } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: uuidV4(),
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.usersRepository.create(newUser);

    return newUser;
  }
}

export { CreateUserUseCase };
