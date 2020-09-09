import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IHolidaysRepository from '../repositories/IHolidaysRepository';

import Holiday from '../infra/typeorm/entities/Holiday';

@injectable()
class ListFilteredHolidaysService {
  constructor(
    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(city_id: string): Promise<Holiday[]> {
    const city = await this.citiesRepository.findById(city_id);

    if (!city) {
      throw new AppError('City not found.');
    }

    const filteredHolidays = await this.holidaysRepository.findAllByCityId(
      city_id,
    );

    return filteredHolidays;
  }
}

export default ListFilteredHolidaysService;
