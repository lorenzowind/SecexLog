import AppError from '@shared/errors/AppError';

import DraftMailProvider from '@shared/container/providers/MailProvider/drafts/DraftMailProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';
import DraftUserTokensRepository from '../repositories/drafts/DraftUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let draftMailProvider: DraftMailProvider;

let draftUsersRepository: DraftUsersRepository;
let draftUserTokensRepository: DraftUserTokensRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    draftMailProvider = new DraftMailProvider();

    draftUsersRepository = new DraftUsersRepository();
    draftUserTokensRepository = new DraftUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      draftUsersRepository,
      draftMailProvider,
      draftUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(draftMailProvider, 'sendMail');

    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud generate a forgot password token', async () => {
    const generateToken = jest.spyOn(draftUserTokensRepository, 'generate');

    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
