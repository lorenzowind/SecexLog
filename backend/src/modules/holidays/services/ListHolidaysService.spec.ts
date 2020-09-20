import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import ListHolidayService from './ListHolidaysService';

let draftHolidaysRepository: DraftHolidaysRepository;

let draftCacheProvider: DraftCacheProvider;

let listHolidays: ListHolidayService;

describe('ListHolidays', () => {
  beforeEach(() => {
    draftHolidaysRepository = new DraftHolidaysRepository();
    draftCacheProvider = new DraftCacheProvider();

    listHolidays = new ListHolidayService(
      draftHolidaysRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to list holidays without authentication', async () => {
    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 2',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await expect(listHolidays.execute('', null)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to list all the holidays', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 2',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await listHolidays.execute('', user_id);

    const response = await listHolidays.execute('', user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to list all the holidays by a search string', async () => {
    const user_id = 'authenticated user id';
    const searchHoliday = 'Holiday search';

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await draftHolidaysRepository.create({
      name: searchHoliday,
      initial_date: '09/08',
      end_date: '10/08',
    });

    const response = await listHolidays.execute(searchHoliday, user_id);

    expect(response).toHaveLength(1);
  });
});
