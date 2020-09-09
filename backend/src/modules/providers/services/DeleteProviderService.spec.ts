import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import DeleteHolidaysService from './DeleteProviderService';

let draftHolidaysRepository: DraftHolidaysRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteHoliday: DeleteHolidaysService;

describe('DeleteHoliday', () => {
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
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const holiday = await draftHolidaysRepository.create({
      name: 'Holiday 2',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await deleteHoliday.execute(holiday.id);

    expect(await draftHolidaysRepository.findById(holiday.id)).toBe(undefined);
  });
});
