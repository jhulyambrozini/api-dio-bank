import { Request } from 'express';
import { LoginController } from '../LoginController';
import { makeMockResponse } from '../../__mocks__/mockResponse.mock';

const mockUserService = {
  getToken: jest.fn(),
};

jest.mock('../../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService;
    }),
  };
});

describe('LoginController', () => {
  const loginController = new LoginController();
  const mockResponse = makeMockResponse();

  afterEach(() => {
    mockUserService.getToken.mockClear();
  });

  it('Should return an internal server error when it cannot find the user', async () => {
    mockUserService.getToken.mockImplementation(() => Promise.reject());

    const mockRequest = {
      body: {
        email: 'teste@invalid.com',
        password: '123456',
      },
    } as Request;

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(500);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Email/Password invalid',
    });
  });

  it('Should return the token according to the email and password provided', async () => {
    mockUserService.getToken.mockImplementation(() => 'token');

    const mockRequest = {
      body: {
        email: 'teste@teste.com',
        password: '123456',
      },
    } as Request;

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({ token: 'token' });
  });
});
