import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import DeleteUserService from './DeleteUserService';

let draftUsersRepository: DraftUsersRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteUser = new DeleteUserService(
      draftUsersRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(
      deleteUser.execute('Non existing user id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an user', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await deleteUser.execute(user.id);

    expect(await draftUsersRepository.findById(user.id)).toBe(undefined);
  });
});
