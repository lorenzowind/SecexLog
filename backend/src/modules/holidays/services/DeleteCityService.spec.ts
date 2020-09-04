import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import DeleteHolidaysService from './DeleteHolidayService';

let draftHolidaysRepository: DraftHolidaysRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteHoliday: DeleteHolidaysService;

describe('Delete', () => {
  beforeEach(() => {
    draftHolidaysRepository = new DraftHolidaysRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteHoliday = new DeleteHolidaysService(
      draftHolidaysRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing Holiday', async () => {
    await expect(
      deleteHoliday.execute('Non existing holiday id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a holiday', async () => {
    await draftHolidaysRepository.create({
      name: 'City 1',
      city_name: 'Manaus',
      initial_date: '09/08/2020',
      end_date: '10/08/2020',
    });

    const holiday = await draftHolidaysRepository.create({
      name: 'City 2',
      city_name: 'Curitiba',
      initial_date: '09/08/2020',
      end_date: '10/08/2020',
    });

    await deleteHoliday.execute(holiday.id);

    expect(await draftHolidaysRepository.findById(holiday.id)).toBe(undefined);
  });
});
