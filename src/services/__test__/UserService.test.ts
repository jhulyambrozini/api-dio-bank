import { UserService } from '../UserService';

jest.mock('../../repositories/UserRepository');
jest.mock('../../database', () => {
  initialize: jest.fn();
});

const mockUserRepository = require('../../repositories/UserRepository');

describe('UserService', () => {
  const userService = new UserService(mockUserRepository);

  it('Should create a new user', async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id_user: '12345',
        name: 'nath',
        email: 'nath@test.com',
        password: '1234567',
      })
    );
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

  // it('Should get all users', () => {
  //   userService.getAllUsers();

  //   expect(userService.getAllUsers()).toMatchObject([user]);
  // });

  // it('Should delete an user', () => {
  //   userService.deleteUser('1');

  //   expect(mockConsole).toHaveBeenCalledWith('usuario deletado', []);
  // });
});
