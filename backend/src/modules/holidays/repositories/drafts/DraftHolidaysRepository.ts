import { v4 } from 'uuid';

import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';

import ICreateHolidayDTO from '@modules/holidays/dtos/ICreateOrUpdateHolidayDTO';

import Holiday from '@modules/holidays/infra/typeorm/entities/Holiday';

export default class DraftHolidaysRepository implements IHolidaysRepository {
  private holidays: Holiday[] = [];

  public async findAllHolidays(
    search: string,
    page: number,
  ): Promise<Holiday[]> {
    const holidays = search
      ? this.holidays.filter(findHoliday => findHoliday.name.includes(search))
      : this.holidays;

    return holidays.slice((page - 1) * 10, page * 10);
  }

  public async findByName(name: string): Promise<Holiday | undefined> {
    const holiday = this.holidays.find(
      findHoliday => findHoliday.name === name,
    );

    return holiday;
  }

  public async findById(id: string): Promise<Holiday | undefined> {
    const holiday = this.holidays.find(findHoliday => findHoliday.id === id);

    return holiday;
  }

  public async create(holidayData: ICreateHolidayDTO): Promise<Holiday> {
    const holiday = new Holiday();

    Object.assign(holiday, { id: v4() }, holidayData);

    this.holidays.push(holiday);

    return holiday;
  }

  public async save(holiday: Holiday): Promise<Holiday> {
    const findIndex = this.holidays.findIndex(
      findHoliday => findHoliday.id === holiday.id,
    );

    this.holidays[findIndex] = holiday;

    return holiday;
  }

  public async remove(holiday: Holiday): Promise<void> {
    const findIndex = this.holidays.findIndex(
      findHoliday => findHoliday.id === holiday.id,
    );
    this.holidays.splice(findIndex, 1);
  }
}
