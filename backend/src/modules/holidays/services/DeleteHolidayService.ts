import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHolidaysRepository from '../repositories/IHolidaysRepository';

@injectable()
class DeleteHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const holiday = await this.holidaysRepository.findById(id);

    if (!holiday) {
      throw new AppError('Holiday not found.');
    }

    await this.holidaysRepository.remove(holiday);

    await this.cacheProvider.invalidatePrefix('holidays-list');
  }
}

export default DeleteHolidayService;
