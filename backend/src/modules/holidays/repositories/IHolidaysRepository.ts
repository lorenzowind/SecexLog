import Holiday from '../infra/typeorm/entities/Holiday';

import ICreateHolidayDTO from '../dtos/ICreateOrUpdateHolidayDTO';

export default interface IHolidaysRepository {
  findAllHolidays(search: string): Promise<Holiday[]>;
  findAllByCityId(city_id: string): Promise<Holiday[]>;
  findByName(name: string): Promise<Holiday | undefined>;
  findById(id: string): Promise<Holiday | undefined>;
  create(data: ICreateHolidayDTO): Promise<Holiday>;
  save(holiday: Holiday): Promise<Holiday>;
  remove(holiday: Holiday): Promise<void>;
}
