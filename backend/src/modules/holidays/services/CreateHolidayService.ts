import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IHolidayRepository from '../repositories/IHolidaysRepository';

import Holiday from '../infra/typeorm/entities/Holiday';
import ICreateHolidayDTO from '../dtos/ICreateOrUpdateHolidaysDTO';

@injectable()
class CreateHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidaysRepository: IHolidayRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    city_name,
    initial_date,
    end_date,
  }: ICreateHolidayDTO): Promise<Holiday> {
    const checkHolidayNameExists = await this.holidaysRepository.findByName(name);

    if (checkHolidayNameExists) {
      throw new AppError('Holiday name already used.');
    }


    const holiday = await this.holidaysRepository.create({
      name,
      city_name,
      initial_date,
      end_date,
    });

    await this.cacheProvider.invalidatePrefix('holiday-list');

    return holiday;
  }
}

export default CreateHolidayService;
