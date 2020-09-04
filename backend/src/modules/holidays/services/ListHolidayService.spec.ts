import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import ListHolidayService from './ListHolidayService';

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
      name: 'City 1',
      city_name: 'Manaus',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    await draftHolidaysRepository.create({
      name: 'City 2',
      city_name: 'cidade 2',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    const response = await listHolidays.execute('', 1, null);

    expect(response).toHaveLength(2);
  });

  it('should be able to list all the holidays from the first page', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'City 1',
      city_name: 'cidade 2',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    await draftHolidaysRepository.create({
      name: 'City 2',
      city_name: 'cidade 2',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    const response = await listHolidays.execute('', 1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'City 1',
      city_name: 'cidade 2',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    const response = await listHolidays.execute('', -1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list holidays from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'City 1',
      city_name: 'cidade 2',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    const response = await listHolidays.execute('', 2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same holidays if the same request is made', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'City 1',
      city_name: 'cidade 2',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    await listHolidays.execute('', 1, user_id);

    const response = await listHolidays.execute('', 1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate holidays from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'City 1',
      city_name: 'cidade 2',
      initial_date: '09/08/2020',
      end_date: '10/08/2020'
    });

    await listHolidays.execute('', 1, user_id);

    const response = await listHolidays.execute('', 2, user_id);

    expect(response).toHaveLength(1);
  });

  /*
  it('should be able to accumulate all the holidays', async () => {
    const user_id = 'authenticated user id';

    await draftHolidaysRepository.create({
      name: 'City 1',
    });

    await draftHolidaysRepository.create({
      name: 'City 2',
      related_cities: 'City 1',
    });

    await draftCitiesRepository.create({
      name: 'City 3',
      related_cities: 'City 1, City 2',
    });

    await draftCitiesRepository.create({
      name: 'City 4',
      related_cities: 'City 2, City 3',
    });

    await draftCitiesRepository.create({
      name: 'City 5',
      related_cities: 'City 3, City 4',
    });

    await draftCitiesRepository.create({
      name: 'City 6',
      related_cities: 'City 3, City 4, City 5',
    });

    await draftCitiesRepository.create({
      name: 'City 7',
      related_cities: 'City 6',
    });

    await draftCitiesRepository.create({
      name: 'City 8',
      related_cities: 'City 6, City 7',
    });

    await draftCitiesRepository.create({
      name: 'City 9',
      related_cities: 'City 5, City 6, City 7, City 8',
    });

    await draftCitiesRepository.create({
      name: 'City 10',
      related_cities: 'City 9',
    });

    await draftCitiesRepository.create({
      name: 'City 11',
      related_cities: 'City 10',
    });

    await draftCitiesRepository.create({
      name: 'City 12',
      related_cities: 'City 11',
    });

    await listCities.execute('', 1, user_id);

    const response = await listCities.execute('', 2, user_id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the holidays from the first page who includes a search string', async () => {
    const holidaySearch = 'Holiday Searching';

    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
    });

    await draftCitiesRepository.create({
      name: 'City 2',
      related_cities: 'City 1',
    });

    await draftCitiesRepository.create({
      name: 'City 3',
      related_cities: 'City 1, City 2',
    });

    await draftCitiesRepository.create({
      name: citySearch,
      related_cities: 'City 2, City 3',
    });

    await draftCitiesRepository.create({
      name: 'City 5',
      related_cities: `City 3, ${citySearch}`,
    });

    await draftCitiesRepository.create({
      name: 'City 6',
      related_cities: 'City 3, City 4, City 5',
    });

    const response = await listCities.execute(citySearch, 1, user_id);

    expect(response).toHaveLength(1);
  });*/
  
});
