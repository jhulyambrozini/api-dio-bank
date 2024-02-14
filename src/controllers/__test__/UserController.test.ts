import { Request } from 'express';

import { UserController } from '../UserController';

import { makeMockResponse } from '../../__mocks__/mockResponse.mock';
import { makeMockRequest } from '../../__mocks__/mockRequest.mock';

const mockUser = {
  id_user: '123456',
  name: 'ana',
  email: 'ana@email.com',
  password: '1234',
};

const mockUserService = {
  createUser: jest.fn().mockImplementation(() => Promise.resolve(mockUser)),
  getUser: jest.fn().mockImplementation(() =>
    Promise.resolve({
      id_user: '123456',
      name: 'ana',
      email: 'ana@email.com',
    })
  ),
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
      id_user: mockUser.id_user,
    });
    expect(mockResponse.state.status).toBe(201);
  });

  it('Should retun an error when not sending an email', () => {
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

  it('Should retun an error when not sending a name', () => {
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

  it('Should retun an error when not sending a password', () => {
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

  it('Should return the user with the given id_user', async () => {
    const mockRequest = makeMockRequest({
      params: {
        uid: mockUser.id_user,
      },
    }) as Request;

    await userController.getUser(mockRequest, mockResponse);

    expect(mockUserService.getUser).toHaveBeenCalledWith(mockUser.id_user);
    expect(mockResponse.state.status).toBe(200);
  });

  it('Should delete an user', async () => {
    mockUserService.getUser.mockImplementation(() => Promise.resolve(mockUser));

    const mockRequest = {
      params: { uid: mockUser.id_user },
    } as unknown as Request;

    await userController.deleteUser(mockRequest, mockResponse);
    console.log(mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: 'usuario deletado',
    });
  });

  it('Should occur an error when not finding a user when deleting', async () => {
    mockUserService.deleteUser.mockImplementation(() => Promise.reject());

    const mockRequest = {
      params: { uid: 'idInvalido' },
    } as unknown as Request;

    await userController.deleteUser(mockRequest, mockResponse);
    console.log(mockResponse);

    expect(mockResponse.state.status).toBe(404);
    expect(mockResponse.state.json).toMatchObject({
      message: 'usuario não cadastrado',
    });
  });
});
