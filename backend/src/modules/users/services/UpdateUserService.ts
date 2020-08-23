import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import ICreateOrUpdateUserDTO from '../dtos/ICreateOrUpdateUserDTO';

interface IRequest extends ICreateOrUpdateUserDTO {
  id: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    login,
    email,
    position,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('Email already in use.');
    }

    const userWithUpdatedLogin = await this.usersRepository.findByLogin(login);

    if (userWithUpdatedLogin && userWithUpdatedLogin.id !== id) {
      throw new AppError('User login already in use.');
    }

    user.name = name;
    user.login = login;
    user.email = email;
    user.position = position;

    user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
