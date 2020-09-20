import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IPathsRepository from '../repositories/IPathsRepository';

import Path from '../infra/typeorm/entities/Path';

@injectable()
class ListPaginationPathsService {
  constructor(
    @inject('PathsRepository')
    private pathsRepository: IPathsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string | null): Promise<Path[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let paths = await this.cacheProvider.recover<Path[]>(
      `paths-list:${user_id}`,
    );

    if (!paths) {
      paths = await this.pathsRepository.findAllPaths();

      await this.cacheProvider.save(`paths-list:${user_id}`, paths);
    }

    return paths;
  }
}

export default ListPaginationPathsService;
