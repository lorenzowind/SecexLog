import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IOpinionsRepository from '../repositories/IOpinionsRepository';

import Opinion from '../infra/typeorm/entities/Opinion';

@injectable()
class ListOpinionsService {
  constructor(
    @inject('OpinionsRepository')
    private OpinionsRepository: IOpinionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    page: number,
    user_id: string | null,
  ): Promise<Opinion[]> {
    let opinions;
    if (!search && user_id) {
      opinions = await this.cacheProvider.recover<Opinion[]>(
        `opinions-list:${user_id}:page=${page}`,
      );
    }

    if (!opinions) {
      opinions = await this.OpinionsRepository.findAllOpinions(
        search,
        page > 0 ? page : 1,
      );

      let OpinionsPreviousPage;

      if (!search && user_id) {
        OpinionsPreviousPage = await this.cacheProvider.recover<Opinion[]>(
          `opinions-list:${user_id}:page=${page - 1}`,
        );
      }

      if (OpinionsPreviousPage) {
        opinions = OpinionsPreviousPage.concat(opinions);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search && user_id) {
        await this.cacheProvider.save(
          `opinions-list:${user_id}:page=${page}`,
          opinions,
        );
      }
    }

    return opinions;
  }
}

export default ListOpinionsService;
