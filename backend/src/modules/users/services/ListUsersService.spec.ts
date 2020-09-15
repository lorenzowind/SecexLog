import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import ListUsersService from './ListUsersService';

let draftUsersRepository: DraftUsersRepository;

let draftCacheProvider: DraftCacheProvider;

let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftCacheProvider = new DraftCacheProvider();

    listUsers = new ListUsersService(draftUsersRepository, draftCacheProvider);
  });

  it('should be able to list all the users', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await listUsers.execute(user.id);

    const response = await listUsers.execute(user.id);

    expect(response).toHaveLength(2);
  });

  it('should not be able to list users without authentication', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await expect(listUsers.execute(null)).rejects.toBeInstanceOf(AppError);
  });
});
