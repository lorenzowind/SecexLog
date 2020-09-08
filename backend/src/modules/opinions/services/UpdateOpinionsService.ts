import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IOpinionsRepository from '../repositories/IOpinionsRepository';

import Opinion from '../infra/typeorm/entities/Opinion';

import IUpdateOpinionDTO from '../dtos/ICreateOrUpdateOpinionsDTO';

interface IRequest extends IUpdateOpinionDTO {
  id: string;
}

@injectable()
class UpdateOpinionsService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  
  public async execute({
    id,
    title,
    description
  }: IRequest): Promise<Opinion> {
    const opinion = await this.opinionsRepository.findById(id);

    if (!opinion) {
      throw new AppError('Opinion not found.');
    }

    const OpinionWithUpdatedTitle = await this.opinionsRepository.findByTitle(
      title,
    );

    if (OpinionWithUpdatedTitle && OpinionWithUpdatedTitle.id !== id) {
      throw new AppError('Opinion title already in use.');
    }


    opinion.title = title;
    opinion.description = description;

    await this.cacheProvider.invalidatePrefix('opinions-list');

    return this.opinionsRepository.save(opinion);
  }
}

export default UpdateOpinionsService;
