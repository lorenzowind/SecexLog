import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IHolidaysRepository from '../repositories/IHolidaysRepository';

import Holiday from '../infra/typeorm/entities/Holiday';
import IUpdateHolidaysDTO from '../dtos/ICreateOrUpdateHolidaysDTO';

interface IRequest extends IUpdateHolidaysDTO {
  id: string;
}

@injectable()
class UpdateHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    city_name,
    initial_date,
    end_date
  }: IRequest): Promise<Holiday> {
    const holiday = await this.holidaysRepository.findById(id);

    if (!holiday) {
      throw new AppError('Holiday not found.');
    }

    const holidayWithUpdatedName = await this.holidaysRepository.findByName(name);

    if (holidayWithUpdatedName && holidayWithUpdatedName.id !== id) {
      throw new AppError('Holiday name already in use.');
    }
    /*
    if (related_cities) {
      const checkRelatedCities = await this.citiesRepository.checkRelatedCities(
        related_cities,
      );

      if (!checkRelatedCities) {
        throw new AppError('Related cities are not valid.');
      }
    }*/

    holiday.name = name;
    holiday.end_date = end_date;
    holiday.initial_date = initial_date;
    holiday.city_name = city_name;
    

    await this.cacheProvider.invalidatePrefix('holiday-list');

    return this.holidaysRepository.save(holiday);
  }
}

export default UpdateHolidayService;
