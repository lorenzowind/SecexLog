import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '../repositories/ICitiesRepository';

import City from '../infra/typeorm/entities/City';

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string | null): Promise<City[]> {
    let cities;

    if (user_id) {
      cities = await this.cacheProvider.recover<City[]>(
        `cities-list:${user_id}`,
      );
    }

    if (!cities) {
      cities = await this.citiesRepository.findAllCities();

      if (user_id) {
        await this.cacheProvider.save(`cities-list:${user_id}`, cities);
      }
    }

    return cities;
  }
}

export default ListCitiesService;
