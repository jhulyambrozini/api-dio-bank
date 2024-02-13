const db = [
  {
    name: 'livia',
    email: 'livia@email.com',
  },
];

export class UserService {
  createUser(name: string, email: string) {
    const user = {
      name,
      email,
    };

    db.push(user);
    console.log('db atualizado', db);
  }

  getAllUsers() {
    return db;
  }
}
