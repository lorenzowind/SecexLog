import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '../repositories/ICitiesRepository';
import IRelatedCitiesRepository from '../repositories/IRelatedCitiesRepository';

import City from '../infra/typeorm/entities/City';
import ICreateCityDTO from '../dtos/ICreateOrUpdateCityRequestDTO';

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('RelatedCitiesRepository')
    private relatedCitiesRepository: IRelatedCitiesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
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
  }: ICreateCityDTO): Promise<City> {
    const checkCityNameExists = await this.citiesRepository.findByName(name);

    if (checkCityNameExists) {
      throw new AppError('City name already used.');
    }

    const city = await this.citiesRepository.create({
      name,
      city_observation,
      end_flood_date,
      initial_flood_date,
      interdiction_observation,
      is_auditated,
      is_base,
      latitude,
      longitude,
    });

    if (related_cities) {
      for (let index = 0; index < related_cities.length; index += 1) {
        const checkRelatedCity = await this.citiesRepository.findById(
          related_cities[index].related_city_id,
        );

        if (!checkRelatedCity) {
          throw new AppError('Related city not found.');
        }

        await this.relatedCitiesRepository.create(
          city.id,
          related_cities[index].related_city_id,
        );
      }
    }

    await this.cacheProvider.invalidatePrefix('cities-list');

    return city;
  }
}

export default CreateCityService;
