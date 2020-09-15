import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModalsRepository from '../repositories/IModalsRepository';

import Modal from '../infra/typeorm/entities/Modal';

@injectable()
class ListPaginationModalsService {
  constructor(
    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    page: number,
    user_id: string | null,
  ): Promise<Modal[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let modals = !search
      ? await this.cacheProvider.recover<Modal[]>(
          `modals-list:${user_id}:page=${page}`,
        )
      : null;

    if (!modals) {
      modals = await this.modalsRepository.findAllPaginationModals(
        search,
        page > 0 ? page : 1,
      );

      let modalsPreviousPage;

      if (!search) {
        modalsPreviousPage = await this.cacheProvider.recover<Modal[]>(
          `modals-list:${user_id}:page=${page - 1}`,
        );
      }

      if (modalsPreviousPage) {
        modals = modalsPreviousPage.concat(modals);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search) {
        await this.cacheProvider.save(
          `modals-list:${user_id}:page=${page}`,
          modals,
        );
      }
    }

    return modals;
  }
}

export default ListPaginationModalsService;
