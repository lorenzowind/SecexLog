import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModalsRepository from '../repositories/IModalsRepository';

import Modal from '../infra/typeorm/entities/Modal';

import IUpdateModalDTO from '../dtos/ICreateOrUpdateModalDTO';

interface IRequest extends IUpdateModalDTO {
  id: string;
}

@injectable()
class UpdateModalService {
  constructor(
    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    image,
    is_safe,
    is_cheap,
    is_fast,
  }: IRequest): Promise<Modal> {
    const modal = await this.modalsRepository.findById(id);

    if (!modal) {
      throw new AppError('Modal not found.');
    }

    const modalWithUpdatedName = await this.modalsRepository.findByName(name);

    if (modalWithUpdatedName && modalWithUpdatedName.id !== id) {
      throw new AppError('Modal name already in use.');
    }

    modal.name = name;
    modal.image = image;
    modal.is_safe = is_safe;
    modal.is_cheap = is_cheap;
    modal.is_fast = is_fast;

    await this.cacheProvider.invalidatePrefix('modals-list');

    return this.modalsRepository.save(modal);
  }
}

export default UpdateModalService;
