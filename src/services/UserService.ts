import { AppDataSource } from '../database';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository = new UserRepository(AppDataSource.manager)) {
    this.userRepository = userRepository;
  }
  createUser = (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const user = new User(name, email, password);
    return this.userRepository.createUser(user);
  };

  getUser = (id_user: string): Promise<User | null> => {
    return this.userRepository.getUser(id_user);
  };

  deleteUser = (id_user: string): Promise<User | null> => {
    return this.userRepository.deleteUser(id_user);
  };
}
