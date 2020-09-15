import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IOpinionsRepository from '../repositories/IOpinionsRepository';

import Opinion from '../infra/typeorm/entities/Opinion';

@injectable()
class ListOpinionsService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string | null): Promise<Opinion[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let opinions = await this.cacheProvider.recover<Opinion[]>(
      `opinions-list:${user_id}`,
    );

    if (!opinions) {
      opinions = await this.opinionsRepository.findAllOpinions();

      await this.cacheProvider.save(`opinions-list:${user_id}`, opinions);
    }

    return opinions;
  }
}

export default ListOpinionsService;
