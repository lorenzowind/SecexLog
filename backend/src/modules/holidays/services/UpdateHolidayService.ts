import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IHolidaysRepository from '../repositories/IHolidaysRepository';

import Holiday from '../infra/typeorm/entities/Holiday';

import IUpdateHolidayDTO from '../dtos/ICreateOrUpdateHolidayDTO';

interface IRequest extends IUpdateHolidayDTO {
  id: string;
}

@injectable()
class UpdateHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    city_name,
    initial_date,
    end_date,
  }: IRequest): Promise<Holiday> {
    const holiday = await this.holidaysRepository.findById(id);

    if (!holiday) {
      throw new AppError('Holiday not found.');
    }

    const holidayWithUpdatedName = await this.holidaysRepository.findByName(
      name,
    );

    if (holidayWithUpdatedName && holidayWithUpdatedName.id !== id) {
      throw new AppError('Holiday name already in use.');
    }

    if (city_name) {
      const checkCityNameExists = await this.citiesRepository.findByName(
        city_name,
      );

      if (!checkCityNameExists) {
        throw new AppError('Informed city does not exists.');
      }
    }

    holiday.name = name;
    holiday.end_date = end_date;
    holiday.initial_date = initial_date;
    holiday.city_name = city_name;

    await this.cacheProvider.invalidatePrefix('holidays-list');

    return this.holidaysRepository.save(holiday);
  }
}

export default UpdateHolidayService;
