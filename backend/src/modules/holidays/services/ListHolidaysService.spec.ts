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

  it('should be able to list all the holidays from the first page without authentication', async () => {
    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 2',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const response = await listHolidays.execute('', 1, null);

    expect(response).toHaveLength(2);
  });

  it('should be able to list all the holidays from the first page', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 2',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const response = await listHolidays.execute('', 1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const response = await listHolidays.execute('', -1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list holidays from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const response = await listHolidays.execute('', 2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same holidays if the same request is made', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await listHolidays.execute('', 1, user_id);

    const response = await listHolidays.execute('', 1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate holidays from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_name: '',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await listHolidays.execute('', 1, user_id);

    const response = await listHolidays.execute('', 2, user_id);

    expect(response).toHaveLength(1);
  });
});
