import { UserController } from '../UserController';

import { makeMockResponse } from '../../__mocks__/mockResponse.mock';
import { Request, response } from 'express';
import { makeMockRequest } from '../../__mocks__/mockRequest.mock';

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
  const mockResponse = makeMockResponse();

  it('Should create an user', async () => {
    const mockRequest = {
      body: {
        name: 'ana',
        email: 'ana@email.com',
        password: '1234',
      },
    } as Request;

    await userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.json).toMatchObject({
      message: 'Usuário criado com sucesso',
    });
    expect(mockResponse.state.status).toBe(201);
  });

  it('Should retun an error when dont send an email', () => {
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

  it('Should retornar o usuario com o id_user informado', async () => {
    const mockRequest = makeMockRequest({
      params: {
        uid: '123456',
      },
    }) as Request;

    await userController.getUser(mockRequest, mockResponse);

    expect(mockUserService.getUser).toHaveBeenCalledWith('123456');
    expect(mockResponse.state.status).toBe(200);
  });

  it('Should delete an user', async () => {
    const mockResponse = makeMockResponse();

    const mockRequest = {
      params: { uid: '1' },
    } as unknown as Request;

    await userController.deleteUser(mockRequest, mockResponse);
    console.log(mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: 'usuario deletado',
    });
  });
});
