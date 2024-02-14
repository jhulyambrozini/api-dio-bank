import * as jwt from 'jsonwebtoken';

import { UserService } from '../UserService';

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

  it('Should return a user token', async () => {
    jest
      .spyOn(userService, 'getAuthenticatedUser')
      .mockImplementation(() => Promise.resolve(mockUser));
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
    const token = await userService.getToken('nath@test.com', '1234567');

    expect(token).toBe('token');
  });

  it("Should return an error if it doesn't find a user", async () => {
    jest
      .spyOn(userService, 'getAuthenticatedUser')
      .mockImplementation(() => Promise.resolve(null));

    await expect(
      userService.getToken('invalid@email', '12345')
    ).rejects.toThrow(new Error('Email/Senha inválidos'));
  });

  it('Should delete a user by the id provided', async () => {
    mockUserRepository.deleteUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));

    const response = await userService.deleteUser('12345');

    expect(mockUserRepository.deleteUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      id_user: '12345',
      name: 'nath',
      email: 'nath@test.com',
      password: '1234567',
    });
  });
});
