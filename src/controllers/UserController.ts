import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = async (request: Request, response: Response) => {
    const user = request.body;

    if (!user.name || !user.email || !user.password) {
      return response
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios' });
    }

    const newUser = await this.userService.createUser(
      user.name,
      user.email,
      user.password
    );

    response.status(201).json({
      message: 'Usuário criado com sucesso',
      user: newUser, // Supondo que 'newUser' seja o objeto do usuário criado
    });
  };

  getUser = async (request: Request, response: Response) => {
    const { uid } = request.params;
    const user = await this.userService.getUser(uid);

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    return response.status(200).json(user);
  };

  deleteUser = async (request: Request, response: Response) => {
    const { uid } = request.params;

    await this.userService.deleteUser(uid);

    return response.status(200).json({ message: 'usuario deletado' });
  };
}
