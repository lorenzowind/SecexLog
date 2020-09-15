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

  public async execute(user_id: string | null): Promise<Provider[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let providers = await this.cacheProvider.recover<Provider[]>(
      `providers-list:${user_id}`,
    );

    if (!providers) {
      providers = await this.providersRepository.findAllProviders();

      await this.cacheProvider.save(`providers-list:${user_id}`, providers);
    }

    return providers;
  }
}

export default ListProvidersService;
