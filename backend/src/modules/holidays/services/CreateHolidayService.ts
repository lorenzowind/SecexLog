import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IHolidaysRepository from '../repositories/IHolidaysRepository';

import ICreateHolidayDTO from '../dtos/ICreateOrUpdateHolidayDTO';

import Holiday from '../infra/typeorm/entities/Holiday';

@injectable()
class CreateHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    city_id,
    initial_date,
    end_date,
  }: ICreateHolidayDTO): Promise<Holiday> {
    const checkHolidayNameExists = await this.holidaysRepository.findByName(
      name,
    );

    if (checkHolidayNameExists) {
      throw new AppError('Holiday name already used.');
    }

    if (city_id) {
      const checkCityExists = await this.citiesRepository.findById(city_id);

      if (!checkCityExists) {
        throw new AppError('Informed city does not exists.');
      }
    }

    const holiday = await this.holidaysRepository.create({
      name,
      city_id,
      initial_date,
      end_date,
    });

    await this.cacheProvider.invalidatePrefix('holidays-list');

    return holiday;
  }
}

export default CreateHolidayService;
