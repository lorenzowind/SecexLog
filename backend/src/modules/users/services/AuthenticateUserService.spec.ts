import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let draftUsersRepository: DraftUsersRepository;

let draftHashProvider: DraftHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftHashProvider = new DraftHashProvider();

    authenticateUser = new AuthenticateUserService(
      draftUsersRepository,
      draftHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      login: 'john doe',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        login: 'john doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        login: 'john doe',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
