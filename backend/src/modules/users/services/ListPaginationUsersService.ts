import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListPaginationUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    page: number,
    user_id: string | null,
  ): Promise<User[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let users = !search
      ? await this.cacheProvider.recover<User[]>(
          `users-list:${user_id}:page=${page}`,
        )
      : null;

    if (!users) {
      users = await this.usersRepository.findAllPaginationUsers(
        search,
        page > 0 ? page : 1,
      );

      const usersPreviousPage = !search
        ? await this.cacheProvider.recover<User[]>(
            `users-list:${user_id}:page=${page - 1}`,
          )
        : null;

      if (usersPreviousPage) {
        users = usersPreviousPage.concat(users);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search) {
        await this.cacheProvider.save(
          `users-list:${user_id}:page=${page}`,
          users,
        );
      }
    }

    return users;
  }
}

export default ListPaginationUsersService;