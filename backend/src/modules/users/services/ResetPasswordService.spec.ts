import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';
import DraftUserTokensRepository from '../repositories/drafts/DraftUserTokensRepository';

import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import ResetPasswordService from './ResetPasswordService';

let draftUsersRepository: DraftUsersRepository;
let draftUserTokensRepository: DraftUserTokensRepository;

let draftHashProvider: DraftHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftUserTokensRepository = new DraftUserTokensRepository();

    draftHashProvider = new DraftHashProvider();

    resetPassword = new ResetPasswordService(
      draftUsersRepository,
      draftUserTokensRepository,
      draftHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const { token } = await draftUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(draftHashProvider, 'generateHash');

    await resetPassword.execute({
      token,
      password: '123123',
    });

    const updatedUser = await draftUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non existing token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non existing user', async () => {
    const { token } = await draftUserTokensRepository.generate(
      'non existing user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const { token } = await draftUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
