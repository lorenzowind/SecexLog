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
    page: number,
    user_id: string | null,
  ): Promise<City[]> {
    let cities;

    if (!search && user_id) {
      cities = await this.cacheProvider.recover<City[]>(
        `cities-list:${user_id}:page=${page}`,
      );
    }

    if (!cities) {
      cities = await this.citiesRepository.findAllCities(
        search,
        page > 0 ? page : 1,
      );

      let citiesPreviousPage;

      if (!search && user_id) {
        citiesPreviousPage = await this.cacheProvider.recover<City[]>(
          `cities-list:${user_id}:page=${page - 1}`,
        );
      }

      if (citiesPreviousPage) {
        cities = citiesPreviousPage.concat(cities);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search && user_id) {
        await this.cacheProvider.save(
          `cities-list:${user_id}:page=${page}`,
          cities,
        );
      }
    }

    return cities;
  }
}

export default ListCitiesService;
