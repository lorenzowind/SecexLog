import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModalsRepository from '../repositories/IModalsRepository';

import Modal from '../infra/typeorm/entities/Modal';

@injectable()
class ListModalsService {
  constructor(
    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string | null): Promise<Modal[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let modals = await this.cacheProvider.recover<Modal[]>(
      `modals-list:${user_id}`,
    );

    if (!modals) {
      modals = await this.modalsRepository.findAllModals();

      await this.cacheProvider.save(`modals-list:${user_id}`, modals);
    }

    return modals;
  }
}

export default ListModalsService;
