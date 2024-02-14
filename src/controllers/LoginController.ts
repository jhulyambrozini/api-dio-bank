import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class LoginController {
  userService: UserService;

  constructor(userSerive = new UserService()) {
    this.userService = userSerive;
  }

  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return;
    }

    try {
      const token = await this.userService.getToken(email, password);

      return response.status(200).json({ token: token });
    } catch (error) {
      return response.status(500).json({ message: 'Email/Password invalid' });
    }
  };
}
