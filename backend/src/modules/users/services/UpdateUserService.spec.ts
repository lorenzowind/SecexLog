import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import UpdateUserService from './UpdateUserService';

let draftUsersRepository: DraftUsersRepository;

let draftCacheProvider: DraftCacheProvider;
let draftHashProvider: DraftHashProvider;

let UpdateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftHashProvider = new DraftHashProvider();
    draftCacheProvider = new DraftCacheProvider();

    UpdateUser = new UpdateUserService(
      draftUsersRepository,
      draftHashProvider,
      draftCacheProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    const updatedUser = await UpdateUser.execute({
      id: user.id,
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'admin',
      password: '123456',
    });

    expect(updatedUser.name).toBe('John Doe II');
    expect(updatedUser.login).toBe('john doe II');
    expect(updatedUser.email).toBe('johndoeII@example.com');
  });

  it('should not be able to update from a non existing user', async () => {
    expect(
      UpdateUser.execute({
        id: 'non existing user',
        name: 'John Doe',
        login: 'john doe',
        email: 'johndoe@example.com',
        position: 'admin',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another user email', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'admin',
      password: '123456',
    });

    await expect(
      UpdateUser.execute({
        id: user.id,
        name: user.name,
        login: user.login,
        email: 'johndoe@example.com',
        position: user.position,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another user login', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'admin',
      password: '123456',
    });

    await expect(
      UpdateUser.execute({
        id: user.id,
        name: user.name,
        login: 'john doe',
        email: user.email,
        position: user.position,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    const updatedUser = await UpdateUser.execute({
      id: user.id,
      name: user.name,
      login: user.login,
      email: user.email,
      position: user.position,
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });
});
