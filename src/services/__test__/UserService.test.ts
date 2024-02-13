import { UserService } from '../UserService';
import { User } from '../../types/User';

describe('UserService', () => {
  const mockDB: User[] = [];
  const userService = new UserService(mockDB);

  const mockConsole = jest.spyOn(global.console, 'log');

  const user = {
    name: 'bia',
    email: 'bia@email.com',
    id: '1',
  };

  afterEach(() => {
    mockConsole.mockClear();
  });

  it('Should create a new user', () => {
    userService.createUser(user);

    expect(mockConsole).toHaveBeenCalledWith('db atualizado', mockDB);
  });

  it('Should get all users', () => {
    userService.getAllUsers();

    expect(userService.getAllUsers()).toMatchObject([user]);
  });

  it('Should delete an user', () => {
    userService.deleteUser('1');

    expect(mockConsole).toHaveBeenCalledWith('usuario deletado', []);
  });
});
