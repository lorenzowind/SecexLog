import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '../repositories/ICitiesRepository';
import IRelatedCitiesRepository from '../repositories/IRelatedCitiesRepository';

import City from '../infra/typeorm/entities/City';

import IUpdateCityDTO from '../dtos/ICreateOrUpdateCityRequestDTO';

interface IRequest extends IUpdateCityDTO {
  id: string;
}

@injectable()
class UpdateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('RelatedCitiesRepository')
    private relatedCitiesRepository: IRelatedCitiesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    city_observation,
    end_flood_date,
    initial_flood_date,
    interdiction_observation,
    is_auditated,
    is_base,
    latitude,
    longitude,
    related_cities,
  }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findById(id);

    if (!city) {
      throw new AppError('City not found.');
    }

    const cityWithUpdatedName = await this.citiesRepository.findByName(name);

    if (cityWithUpdatedName && cityWithUpdatedName.id !== id) {
      throw new AppError('City name already in use.');
    }

    if (related_cities) {
      await this.relatedCitiesRepository.removeAllByCityId(id);

      for (let index = 0; index < related_cities.length; index += 1) {
        const checkRelatedCity = await this.citiesRepository.findById(
          related_cities[index].related_city_id,
        );

        if (!checkRelatedCity) {
          throw new AppError('Related city not found.');
        } else if (checkRelatedCity.id === id) {
          throw new AppError('A city cannot have itself as a related city.');
        }

        await this.relatedCitiesRepository.create(
          id,
          related_cities[index].related_city_id,
        );
      }
    }

    city.name = name;
    city.city_observation = city_observation;
    city.end_flood_date = end_flood_date;
    city.initial_flood_date = initial_flood_date;
    city.interdiction_observation = interdiction_observation;
    city.is_auditated = is_auditated;
    city.is_base = is_base;
    city.latitude = latitude;
    city.longitude = longitude;

    await this.cacheProvider.invalidatePrefix('cities-list');

    return this.citiesRepository.save(city);
  }
}

export default UpdateCityService;
