import { UserController } from '../UserController';

import {
  MockResponse,
  makeMockResponse,
} from '../../__mocks__/mockResponse.mock';
import { Request } from 'express';

const mockUserService = {
  createUser: jest.fn(),
  getUser: jest.fn(),
  deleteUser: jest.fn(),
};

jest.mock('../../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService;
    }),
  };
});

describe('UserController', () => {
  const userController = new UserController();

  it('Should retun an error when dont send an email', () => {
    const mockResponse = makeMockResponse();

    const mockRequest = {
      body: {
        name: 'ana',
        email: '',
        password: '1234',
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Todos os campos são obrigatórios',
    });
  });

  it('Should retun an error when dont send a name', () => {
    const mockResponse = makeMockResponse();

    const mockRequest = {
      body: {
        name: '',
        email: 'ana@test.com',
        password: '1234',
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Todos os campos são obrigatórios',
    });
  });

  it('Should retun an error when dont send a password', () => {
    const mockResponse = makeMockResponse();

    const mockRequest = {
      body: {
        name: 'ana',
        email: 'ana@test.com',
        password: '',
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Todos os campos são obrigatórios',
    });
  });

  it('Should delete an user', async () => {
    const mockResponse = makeMockResponse();

    const mockRequest = {
      params: { uid: '1' },
    } as unknown as Request;

    await userController.deleteUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: 'usuario deletado',
    });
  });
});
