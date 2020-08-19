import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateOrUpdateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    login,
    email,
    position,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserEmailExists = await this.usersRepository.findByEmail(email);

    if (checkUserEmailExists) {
      throw new AppError('Email address already used.');
    }

    const checkUserLoginExists = await this.usersRepository.findByLogin(login);

    if (checkUserLoginExists) {
      throw new AppError('User login already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      login,
      email,
      position,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
