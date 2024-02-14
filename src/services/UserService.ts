import { sign } from 'jsonwebtoken';
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

  getAuthenticatedUser = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    return this.userRepository.getUserByEmailAndPassword(email, password);
  };

  getToken = async (email: string, password: string): Promise<string> => {
    const user = await this.getAuthenticatedUser(email, password);

    if (!user) {
      throw new Error('Email/Senha inválidos');
    }

    const tokenData = {
      name: user?.name,
      email: user?.email,
    };

    const tokenKey = '1234567';
    const tokenOptions = {
      subject: user?.id_user,
    };

    const token = sign(tokenData, tokenKey, tokenOptions);

    return token;
  };

  deleteUser = (id_user: string): Promise<User | null> => {
    return this.userRepository.deleteUser(id_user);
  };
}
