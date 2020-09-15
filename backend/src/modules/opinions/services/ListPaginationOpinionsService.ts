import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IOpinionsRepository from '../repositories/IOpinionsRepository';

import Opinion from '../infra/typeorm/entities/Opinion';

@injectable()
class ListPaginationOpinionsService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    page: number,
    user_id: string | null,
  ): Promise<Opinion[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let opinions = !search
      ? await this.cacheProvider.recover<Opinion[]>(
          `opinions-list:${user_id}:page=${page}`,
        )
      : null;

    if (!opinions) {
      opinions = await this.opinionsRepository.findAllPaginationOpinions(
        search,
        page > 0 ? page : 1,
      );

      let opinionsPreviousPage;

      if (!search) {
        opinionsPreviousPage = await this.cacheProvider.recover<Opinion[]>(
          `opinions-list:${user_id}:page=${page - 1}`,
        );
      }

      if (opinionsPreviousPage) {
        opinions = opinionsPreviousPage.concat(opinions);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search) {
        await this.cacheProvider.save(
          `opinions-list:${user_id}:page=${page}`,
          opinions,
        );
      }
    }

    return opinions;
  }
}

export default ListPaginationOpinionsService;
