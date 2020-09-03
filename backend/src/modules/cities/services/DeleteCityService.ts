import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICitiesRepository from '../repositories/ICitiesRepository';

@injectable()
class DeleteCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const city = await this.citiesRepository.findById(id);

    if (!city) {
      throw new AppError('City not found.');
    }

    await this.citiesRepository.remove(city);

    await this.cacheProvider.invalidatePrefix('cities-list');
  }
}

export default DeleteCityService;
