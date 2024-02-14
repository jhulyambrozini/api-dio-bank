import { UserService } from '../UserService';
import * as jwt from 'jsonwebtoken';

jest.mock('../../repositories/UserRepository');
jest.mock('../../database', () => {
  initialize: jest.fn();
});
jest.mock('jsonwebtoken');

const mockUserRepository = require('../../repositories/UserRepository');
const mockUser = {
  id_user: '12345',
  name: 'nath',
  email: 'nath@test.com',
  password: '1234567',
};

describe('UserService', () => {
  const userService = new UserService(mockUserRepository);

  it('Should create a new user', async () => {
    mockUserRepository.createUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));
    const response = await userService.createUser(
      'bia',
      'bia@email.com',
      '1234567'
    );

    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      id_user: '12345',
      name: 'nath',
      email: 'nath@test.com',
      password: '1234567',
    });
  });

  it('Deve retornar um token de usuario', async () => {
    jest
      .spyOn(userService, 'getAuthenticatedUser')
      .mockImplementation(() => Promise.resolve(mockUser));
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
    const token = await userService.getToken('nath@test.com', '1234567');

    expect(token).toBe('token');
  });

  it('Deve retornar um erro caso não encontre um usuário', async () => {
    jest
      .spyOn(userService, 'getAuthenticatedUser')
      .mockImplementation(() => Promise.resolve(null));

    await expect(
      userService.getToken('invalid@email', '12345')
    ).rejects.toThrow(new Error('Email/Senha inválidos'));
  });
});
