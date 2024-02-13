import { EntityManager } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  constructor(private manager: EntityManager) {}

  createUser = async (user: User) => {
    return this.manager.save(user);
  };
}
