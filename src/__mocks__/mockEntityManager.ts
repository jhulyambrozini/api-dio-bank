import { EntityManager } from 'typeorm';

interface MockManegerArgs {
  saveReturn?: object | [object];
  findOneReturn?: object;
  removereturn?: object;
}
export const getMockEntityManager = async ({
  saveReturn = undefined,
  findOneReturn = undefined,
  removereturn = undefined,
}: MockManegerArgs): Promise<EntityManager> => {
  const manager: Partial<EntityManager> = {};

  manager.save = jest
    .fn()
    .mockImplementation(() => Promise.resolve(saveReturn));

  manager.findOne = jest
    .fn()
    .mockImplementation(() => Promise.resolve(findOneReturn));

  manager.remove = jest
    .fn()
    .mockImplementation(() => Promise.resolve(removereturn));

  return manager as EntityManager;
};
