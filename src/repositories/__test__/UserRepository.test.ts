import { EntityManager } from 'typeorm';
import { getMockEntityManager } from '../../__mocks__/mockEntityManager';
import { User } from '../../entities/User';
import { UserRepository } from '../UserRepository';

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
    });
    userRepository = new UserRepository(manageMock as EntityManager);
  });

  it('Deve cadastrar o usuario no banco de dados', async () => {
    const response = await userRepository.createUser(mockuser);

    expect(manageMock.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockuser);
  });
});
