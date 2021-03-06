import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import CreateUserService from './CreateUserService';

let draftUsersRepository: DraftUsersRepository;

let draftCacheProvider: DraftCacheProvider;
let draftHashProvider: DraftHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftHashProvider = new DraftHashProvider();
    draftCacheProvider = new DraftCacheProvider();

    createUser = new CreateUserService(
      draftUsersRepository,
      draftHashProvider,
      draftCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        login: 'john doe II',
        email: 'johndoe@example.com',
        position: 'Administrador',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with the same user login from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        login: 'john doe',
        email: 'johndoeII@example.com',
        position: 'Administrador',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
