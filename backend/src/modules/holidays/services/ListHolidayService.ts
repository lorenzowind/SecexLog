import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IHolidayRepository from '../repositories/IHolidaysRepository';

import Holiday from '../infra/typeorm/entities/Holiday';

@injectable()
class ListHolidayService {
  constructor(
    @inject('HolidayRepository')
    private holidayRepository: IHolidayRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    page: number,
    holiday_id: string | null,
  ): Promise<Holiday[]> {
    let holidays;

    if (!search && holiday_id) {
      holidays = await this.cacheProvider.recover<Holiday[]>(
        `cities-list:${holiday_id}:page=${page}`,
      );
    }

    if (!holidays) {
      holidays = await this.holidayRepository.findAllHolidays(
        search,
        page > 0 ? page : 1,
      );

      let holidayPreviousPage;

      if (!search && holiday_id) {
        holidayPreviousPage = await this.cacheProvider.recover<Holiday[]>(
          `holidays-list:${holiday_id}:page=${page - 1}`,
        );
      }

      if (holidayPreviousPage) {
        holidays = holidayPreviousPage.concat(holidays);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search && holiday_id) {
        await this.cacheProvider.save(
          `holidays-list:${holiday_id}:page=${page}`,
          holidays,
        );
      }
    }

    return holidays;
  }
}

export default ListHolidayService;
