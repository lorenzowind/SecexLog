import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IPathsRepository from '../repositories/IPathsRepository';

@injectable()
class DeletePathService {
  constructor(
    @inject('PathsRepository')
    private pathsRepository: IPathsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const path = await this.pathsRepository.findById(id);

    if (!path) {
      throw new AppError('Path not found.');
    }

    await this.pathsRepository.remove(path);

    await this.cacheProvider.invalidatePrefix('paths-list');
  }
}

export default DeletePathService;
