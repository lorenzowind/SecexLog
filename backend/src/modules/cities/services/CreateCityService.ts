import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '../repositories/ICitiesRepository';

import City from '../infra/typeorm/entities/City';
import ICreateCityDTO from '../dtos/ICreateOrUpdateCityDTO';

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

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

    if (related_cities) {
      const checkRelatedCities = await this.citiesRepository.checkRelatedCities(
        related_cities,
      );

      if (!checkRelatedCities) {
        throw new AppError('Related cities are not valid.');
      }
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
      related_cities,
    });

    await this.cacheProvider.invalidatePrefix('cities-list');

    return city;
  }
}

export default CreateCityService;
