import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IOpinionsRepository from '../repositories/IOpinionsRepository';

import ICreateOpinionDTO from '../dtos/ICreateOrUpdateOpinionDTO';

import Opinion from '../infra/typeorm/entities/Opinion';

@injectable()
class CreateOpinionService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    title,
    description,
  }: ICreateOpinionDTO): Promise<Opinion> {
    const opinion = await this.opinionsRepository.create({
      title,
      description,
    });

    await this.cacheProvider.invalidatePrefix('opinions-list');

    return opinion;
  }
}

export default CreateOpinionService;
