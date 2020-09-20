import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModalsRepository from '../repositories/IModalsRepository';

import Modal from '../infra/typeorm/entities/Modal';

import ICreateModalDTO from '../dtos/ICreateOrUpdateModalDTO';

@injectable()
class CreateModalService {
  constructor(
    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    image,
    is_safe,
    is_cheap,
    is_fast,
  }: ICreateModalDTO): Promise<Modal> {
    const checkModalNameExists = await this.modalsRepository.findByName(name);

    if (checkModalNameExists) {
      throw new AppError('Modal name already used.');
    }

    const modal = await this.modalsRepository.create({
      name,
      image,
      is_safe,
      is_cheap,
      is_fast,
    });

    await this.cacheProvider.invalidatePrefix('modals-list');

    return modal;
  }
}

export default CreateModalService;
