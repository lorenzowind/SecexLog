import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModalsRepository from '../repositories/IModalsRepository';

@injectable()
class DeleteModalService {
  constructor(
    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const modal = await this.modalsRepository.findById(id);

    if (!modal) {
      throw new AppError('Modal not found.');
    }

    await this.modalsRepository.remove(modal);

    await this.cacheProvider.invalidatePrefix('modals-list');
  }
}

export default DeleteModalService;
