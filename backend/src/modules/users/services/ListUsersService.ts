import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    user_id: string | null,
  ): Promise<User[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let users = !search
      ? await this.cacheProvider.recover<User[]>(`users-list:${user_id}`)
      : null;

    if (!users) {
      users = await this.usersRepository.findAllUsers(search);

      if (!search) {
        await this.cacheProvider.save(`users-list:${user_id}`, users);
      }
    }

    return users;
  }
}

export default ListUsersService;
