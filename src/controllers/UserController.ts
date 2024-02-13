import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (request: Request, response: Response) => {
    const user = request.body;

    if (!user.name) {
      return response.status(400).json({ message: 'Nome obrigatório' });
    }

    if (!user.email) {
      return response.status(400).json({ message: 'Email obrigatório' });
    }

    const userData = {
      name: user.name,
      email: user.email,
      id: crypto.randomUUID(),
    };

    console.log(this.userService);

    this.userService.createUser(userData);

    return response.status(201).json({ message: 'usuario criado' });
  };

  getAllUsers = (request: Request, response: Response) => {
    const users = this.userService.getAllUsers();

    if (!users) {
      return response
        .status(404)
        .json({ message: 'Nenhum usuário encontrado' });
    }

    return response.status(200).json(users);
  };

  deleteUser = (request: Request, response: Response) => {
    const { uid } = request.params;

    this.userService.deleteUser(uid);

    return response.status(200).json({ message: 'usuario deletado' });
  };
}
