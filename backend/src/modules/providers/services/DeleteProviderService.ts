import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProvidersRepository from '../repositories/IProvidersRepository';

@injectable()
class DeleteProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const provider = await this.providersRepository.findById(id);

    if (!provider) {
      throw new AppError('Provider not found.');
    }

    await this.providersRepository.remove(provider);

    await this.cacheProvider.invalidatePrefix('providers-list');
  }
}

export default DeleteProviderService;
