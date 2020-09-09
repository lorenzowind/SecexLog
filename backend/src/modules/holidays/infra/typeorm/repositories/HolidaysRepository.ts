import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';

import ICreateHolidayDTO from '@modules/holidays/dtos/ICreateOrUpdateHolidayDTO';

import Holiday from '../entities/Holiday';

class HolidaysRepository implements IHolidaysRepository {
  private ormRepository: Repository<Holiday>;

  constructor() {
    this.ormRepository = getRepository(Holiday);
  }

  public async findAllHolidays(
    search: string,
    page: number,
  ): Promise<Holiday[]> {
    const holidays =
      search !== ''
        ? await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
          });

    return holidays;
  }

  public async findAllByCityId(city_id: string): Promise<Holiday[]> {
    const filteredHolidays = this.ormRepository.find({
      where: { city_id },
    });

    return filteredHolidays;
  }

  public async findByName(name: string): Promise<Holiday | undefined> {
    const findHoliday = await this.ormRepository.findOne(name);

    return findHoliday;
  }

  public async findById(id: string): Promise<Holiday | undefined> {
    const findHoliday = await this.ormRepository.findOne(id);

    return findHoliday;
  }

  public async create(holidayData: ICreateHolidayDTO): Promise<Holiday> {
    const holiday = this.ormRepository.create(holidayData);

    Object.assign(holiday, { id: v4() });

    await this.ormRepository.save(holiday);

    return holiday;
  }

  public async save(holiday: Holiday): Promise<Holiday> {
    return this.ormRepository.save(holiday);
  }

  public async remove(holiday: Holiday): Promise<void> {
    await this.ormRepository.remove(holiday);
  }
}

export default HolidaysRepository;
