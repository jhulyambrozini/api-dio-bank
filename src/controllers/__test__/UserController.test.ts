import { UserService } from '../../services/UserService';
import { UserController } from '../UserController';

import { makeMockResponse } from '../../__mocks__/mockResponse.mock';
import { Request } from 'express';
import { makeMockRequest } from '../../__mocks__/mockRequest.mock';

describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn().mockReturnValueOnce({
      name: 'ana',
      email: 'ana@test.com',
      id: '1',
    }),
    deleteUser: jest.fn(),
  };

  const userController = new UserController(mockUserService as UserService);

  const mockResponse = makeMockResponse();

  it('Should create a new user', () => {
    const mockRequest = {
      body: {
        name: 'ana',
        email: 'ana@test.com',
        id: '1',
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: 'usuario criado',
    });
  });

  it('Should retun an error when dont send an email', () => {
    const mockRequest = {
      body: {
        name: 'ana',
        id: '1',
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Email obrigatório',
    });
  });

  it('Should retun an error when dont send a name', () => {
    const mockRequest = {
      body: {
        email: 'ana@test.com',
        id: '1',
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Nome obrigatório',
    });
  });

  it('Should get all users', () => {
    const mockRequest = {} as Request;

    userController.getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      name: 'ana',
      email: 'ana@test.com',
      id: '1',
    });
  });

  it('should return an error when dont find an user', () => {
    const mockRequest = {} as Request;

    const mockUserService: Partial<UserService> = {
      getAllUsers: jest.fn(),
    };

    const userController = new UserController(mockUserService as UserService);

    userController.getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(404);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Nenhum usuário encontrado',
    });
  });

  it('Should delete an user', () => {
    const mockRequest = {
      params: '1',
    } as unknown as Request;

    userController.deleteUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: 'usuario deletado',
    });
  });
});
