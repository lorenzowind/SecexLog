import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.remove(user);

    await this.cacheProvider.invalidatePrefix('users-list');
  }
}

export default DeleteUserService;
