import { EntityManager } from 'typeorm';

import { UserRepository } from '../UserRepository';

import { User } from '../../entities/User';

import { getMockEntityManager } from '../../__mocks__/mockEntityManager';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let manageMock: Partial<EntityManager>;

  const mockuser: User = {
    id_user: '1234',
    name: 'ana',
    email: 'ana@email.com',
    password: 'password',
  };

  beforeAll(async () => {
    manageMock = await getMockEntityManager({
      saveReturn: mockuser,
      findOneReturn: mockuser,
      removereturn: mockuser,
    });

    userRepository = new UserRepository(manageMock as EntityManager);
  });

  it('Should register the user in the database', async () => {
    const response = await userRepository.createUser(mockuser);

    expect(manageMock.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockuser);
  });

  it('Should search for a user in the database according to id_user', async () => {
    const response = await userRepository.getUser('1234');

    expect(manageMock.findOne).toHaveBeenCalled();
    expect(response).toMatchObject(mockuser);
  });

  it('Should search for a user by email and password', async () => {
    const response = await userRepository.getUserByEmailAndPassword(
      'ana@email.com',
      'password'
    );

    expect(manageMock.findOne).toHaveBeenCalled();
    expect(response).toMatchObject(mockuser);
  });

  it('Should delete a user with the given id', async () => {
    const response = await userRepository.deleteUser('1234');

    expect(manageMock.findOne).toHaveBeenCalled();
    expect(manageMock.remove).toHaveBeenCalled();
    expect(response).toMatchObject(mockuser);
  });
});
