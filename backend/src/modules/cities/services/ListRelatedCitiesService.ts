import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRelatedCitiesRepository from '../repositories/IRelatedCitiesRepository';
import ICitiesRepository from '../repositories/ICitiesRepository';

import RelatedCity from '../infra/typeorm/entities/RelatedCity';

@injectable()
class ListRelatedCitiesService {
  constructor(
    @inject('RelatedCitiesRepository')
    private relatedCitiesRepository: IRelatedCitiesRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(city_id: string): Promise<RelatedCity[]> {
    const city = await this.citiesRepository.findById(city_id);

    if (!city) {
      throw new AppError('City not found.');
    }

    const relatedCities = await this.relatedCitiesRepository.findAllByCityId(
      city_id,
    );

    return relatedCities;
  }
}

export default ListRelatedCitiesService;
