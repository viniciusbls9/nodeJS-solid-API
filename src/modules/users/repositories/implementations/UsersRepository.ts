import { v4 as uuidV4 } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = {
      id: uuidV4(),
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findById(id: string): User | undefined {
    const findUserById = this.users.find((user) => user.id === id);

    if (!findUserById) {
      throw new Error("User not found");
    }

    return findUserById;
  }

  findByEmail(email: string): User | undefined {
    const findUserByEmail = this.users.find((user) => user.email === email);

    if (!findUserByEmail) {
      throw new Error("User not found");
    }

    return findUserByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const turnUserAdmin = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };
    return turnUserAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
