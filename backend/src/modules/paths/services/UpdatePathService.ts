import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import IPathsRepository from '../repositories/IPathsRepository';

import Path from '../infra/typeorm/entities/Path';

import IUpdatePathDTO from '../dtos/ICreateOrUpdatePathDTO';

interface IRequest extends IUpdatePathDTO {
  id: string;
}

@injectable()
class UpdatePathService {
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
    id,
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
  }: IRequest): Promise<Path> {
    const path = await this.pathsRepository.findById(id);

    if (!path) {
      throw new AppError('Path not found.');
    }

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

    path.origin_city_id = origin_city_id;
    path.destination_city_id = destination_city_id;
    path.modal_id = modal_id;
    path.provider_id = provider_id;
    path.boarding_days = boarding_days;
    path.boarding_times = boarding_times;
    path.duration = duration;
    path.mileage = mileage;
    path.cost = cost;
    path.boarding_place = boarding_place;
    path.departure_place = departure_place;
    path.is_hired = is_hired;

    await this.cacheProvider.invalidatePrefix('paths-list');

    return this.pathsRepository.save(path);
  }
}

export default UpdatePathService;
