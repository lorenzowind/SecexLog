import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProvidersRepository from '../repositories/IProvidersRepository';

import Provider from '../infra/typeorm/entities/Provider';

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    page: number,
    user_id: string | null,
  ): Promise<Provider[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let providers = !search
      ? await this.cacheProvider.recover<Provider[]>(
          `providers-list:${user_id}:page=${page}`,
        )
      : null;

    if (!providers) {
      providers = await this.providersRepository.findAllProviders(
        search,
        page > 0 ? page : 1,
      );

      let providersPreviousPage;

      if (!search) {
        providersPreviousPage = await this.cacheProvider.recover<Provider[]>(
          `providers-list:${user_id}:page=${page - 1}`,
        );
      }

      if (providersPreviousPage) {
        providers = providersPreviousPage.concat(providers);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search) {
        await this.cacheProvider.save(
          `providers-list:${user_id}:page=${page}`,
          providers,
        );
      }
    }

    return providers;
  }
}

export default ListProvidersService;
