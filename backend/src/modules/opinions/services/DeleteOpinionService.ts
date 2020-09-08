import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IOpinionsRepository from '../repositories/IOpinionsRepository';

@injectable()
class DeleteOpinionService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const opinion = await this.opinionsRepository.findById(id);

    if (!opinion) {
      throw new AppError('Opinion not found.');
    }

    await this.opinionsRepository.remove(opinion);

    await this.cacheProvider.invalidatePrefix('opinions-list');
  }
}

export default DeleteOpinionService;
