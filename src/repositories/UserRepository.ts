import { EntityManager } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  constructor(private manager: EntityManager) {}

  createUser = async (user: User): Promise<User> => {
    return this.manager.save(user);
  };

  getUser = async (userId: string): Promise<User | null> => {
    const user = await this.manager.findOne(User, {
      where: {
        id_user: userId,
      },
    });

    return user;
  };

  deleteUser = async (userId: string): Promise<User | null> => {
    const user = await this.manager.findOne(User, {
      where: {
        id_user: userId,
      },
    });

    return this.manager.remove(user);
  };
}
