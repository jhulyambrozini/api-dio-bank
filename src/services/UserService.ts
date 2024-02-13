import { User } from '../types/User';

const db = [
  {
    name: 'livia',
    email: 'livia@email.com',
    id: '1',
  },
];

export class UserService {
  db: User[];

  constructor(database = db) {
    this.db = database;
  }

  createUser = (user: User) => {
    this.db.push(user);
    console.log('db atualizado', this.db);
  };

  getAllUsers = () => {
    return this.db;
  };

  deleteUser = (uid: string) => {
    this.db = this.db.filter(user => user.id !== uid);

    console.log('usuario deletado', this.db);
  };
}
