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

  public async execute(
    search: string,
    user_id: string | null,
  ): Promise<City[]> {
    let cities;

    if (user_id) {
      cities = !search
        ? await this.cacheProvider.recover<City[]>(`cities-list:${user_id}`)
        : null;
    }

    if (!cities) {
      cities = await this.citiesRepository.findAllCities(search);

      if (user_id && !search) {
        await this.cacheProvider.save(`cities-list:${user_id}`, cities);
      }
    }

    return cities;
  }
}

export default ListCitiesService;
