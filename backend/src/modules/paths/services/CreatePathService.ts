import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import IPathsRepository from '../repositories/IPathsRepository';

import ICreatePathDTO from '../dtos/ICreateOrUpdatePathDTO';

import Path from '../infra/typeorm/entities/Path';

@injectable()
class CreatePathService {
  constructor(
    @inject('PathsRepository')
    private pathsRepository: IPathsRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    origin_city_id,
    destination_city_id,
    modal_id,
    provider_id,
    boarding_days,
    boarding_times,
    duration,
    mileage,
    cost,
    boarding_place,
    departure_place,
    is_hired,
  }: ICreatePathDTO): Promise<Path> {
    const checkOriginCityExists = await this.citiesRepository.findById(
      origin_city_id,
    );

    if (!checkOriginCityExists) {
      throw new AppError('Origin city does not exists.');
    }

    const checkDestinationCityExists = await this.citiesRepository.findById(
      destination_city_id,
    );

    if (!checkDestinationCityExists) {
      throw new AppError('Destination city does not exists.');
    }

    const checkModalExists = await this.modalsRepository.findById(modal_id);

    if (!checkModalExists) {
      throw new AppError('Modal does not exists.');
    }

    const checkProviderExists = await this.providersRepository.findById(
      provider_id,
    );

    if (!checkProviderExists) {
      throw new AppError('Provider does not exists.');
    }

    const path = await this.pathsRepository.create({
      origin_city_id,
      destination_city_id,
      modal_id,
      provider_id,
      boarding_days,
      boarding_times,
      duration,
      mileage,
      cost,
      boarding_place,
      departure_place,
      is_hired,
    });

    await this.cacheProvider.invalidatePrefix('paths-list');

    return path;
  }
}

export default CreatePathService;
