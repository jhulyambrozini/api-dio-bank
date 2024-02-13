import { EntityManager } from 'typeorm';

interface MockManegerArgs {
  saveReturn?: object | [object];
}
export const getMockEntityManager = async ({
  saveReturn = undefined,
}: MockManegerArgs): Promise<EntityManager> => {
  const manager: Partial<EntityManager> = {};

  manager.save = jest
    .fn()
    .mockImplementation(() => Promise.resolve(saveReturn));

  return manager as EntityManager;
};
