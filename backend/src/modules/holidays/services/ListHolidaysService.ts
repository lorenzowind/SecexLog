import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IHolidaysRepository from '../repositories/IHolidaysRepository';

import Holiday from '../infra/typeorm/entities/Holiday';

@injectable()
class ListHolidaysService {
  constructor(
    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    search: string,
    page: number,
    user_id: string | null,
  ): Promise<Holiday[]> {
    let holidays;

    if (!search && user_id) {
      holidays = await this.cacheProvider.recover<Holiday[]>(
        `holidays-list:${user_id}:page=${page}`,
      );
    }

    if (!holidays) {
      holidays = await this.holidaysRepository.findAllHolidays(
        search,
        page > 0 ? page : 1,
      );

      let holidaysPreviousPage;

      if (!search && user_id) {
        holidaysPreviousPage = await this.cacheProvider.recover<Holiday[]>(
          `holidays-list:${user_id}:page=${page - 1}`,
        );
      }

      if (holidaysPreviousPage) {
        holidays = holidaysPreviousPage.concat(holidays);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search && user_id) {
        await this.cacheProvider.save(
          `holidays-list:${user_id}:page=${page}`,
          holidays,
        );
      }
    }

    return holidays;
  }
}

export default ListHolidaysService;
