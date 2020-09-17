import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
    user_id: string | null,
  ): Promise<Holiday[]> {
    if (!user_id) {
      throw new AppError('User id does not exists.');
    }

    let holidays = !search
      ? await this.cacheProvider.recover<Holiday[]>(`holidays-list:${user_id}`)
      : null;

    if (!holidays) {
      holidays = await this.holidaysRepository.findAllHolidays(search);

      if (!search) {
        await this.cacheProvider.save(`holidays-list:${user_id}`, holidays);
      }
    }

    return holidays;
  }
}

export default ListHolidaysService;
