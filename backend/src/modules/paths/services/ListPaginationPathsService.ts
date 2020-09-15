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

  public async execute(page: number, user_id: string | null): Promise<Path[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let paths = await this.cacheProvider.recover<Path[]>(
      `paths-list:${user_id}:page=${page}`,
    );

    if (!paths) {
      paths = await this.pathsRepository.findAllPaginationPaths(
        page > 0 ? page : 1,
      );

      const pathsPreviousPage = await this.cacheProvider.recover<Path[]>(
        `paths-list:${user_id}:page=${page - 1}`,
      );

      if (pathsPreviousPage) {
        paths = pathsPreviousPage.concat(paths);
      } else if (page > 1) {
        return [];
      }

      await this.cacheProvider.save(
        `paths-list:${user_id}:page=${page}`,
        paths,
      );
    }

    return paths;
  }
}

export default ListPaginationPathsService;
