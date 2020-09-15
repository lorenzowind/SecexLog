import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '../repositories/drafts/DraftCitiesRepository';

import ListPaginationCitiesService from './ListPaginationCitiesService';

let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let listPaginationCities: ListPaginationCitiesService;

describe('ListPaginationCities', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    listPaginationCities = new ListPaginationCitiesService(
      draftCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the cities from the first page without authentication', async () => {
    await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    await draftCitiesRepository.create({
      name: 'City 2',
      city_observation: 'city observation 2',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation 2',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const response = await listPaginationCities.execute('', 1, null);

    expect(response).toHaveLength(2);
  });

  it('should be able to list all the cities from the first page', async () => {
    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    await draftCitiesRepository.create({
      name: 'City 2',
      city_observation: 'city observation 2',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation 2',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const response = await listPaginationCities.execute('', 1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const response = await listPaginationCities.execute('', -1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list cities from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const response = await listPaginationCities.execute('', 2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same cities if the same request is made', async () => {
    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    await listPaginationCities.execute('', 1, user_id);

    const response = await listPaginationCities.execute('', 1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate cities from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    await listPaginationCities.execute('', 1, user_id);

    const response = await listPaginationCities.execute('', 2, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the cities', async () => {
    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
    });

    await draftCitiesRepository.create({
      name: 'City 2',
    });

    await draftCitiesRepository.create({
      name: 'City 3',
    });

    await draftCitiesRepository.create({
      name: 'City 4',
    });

    await draftCitiesRepository.create({
      name: 'City 5',
    });

    await draftCitiesRepository.create({
      name: 'City 6',
    });

    await draftCitiesRepository.create({
      name: 'City 7',
    });

    await draftCitiesRepository.create({
      name: 'City 8',
    });

    await draftCitiesRepository.create({
      name: 'City 9',
    });

    await draftCitiesRepository.create({
      name: 'City 10',
    });

    await draftCitiesRepository.create({
      name: 'City 11',
    });

    await draftCitiesRepository.create({
      name: 'City 12',
    });

    await listPaginationCities.execute('', 1, user_id);

    const response = await listPaginationCities.execute('', 2, user_id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the cities from the first page which includes a search string', async () => {
    const citySearch = 'City Searching';

    const user_id = 'authenticated user id';

    await draftCitiesRepository.create({
      name: 'City 1',
    });

    await draftCitiesRepository.create({
      name: 'City 2',
    });

    await draftCitiesRepository.create({
      name: 'City 3',
    });

    await draftCitiesRepository.create({
      name: citySearch,
    });

    await draftCitiesRepository.create({
      name: 'City 5',
    });

    await draftCitiesRepository.create({
      name: 'City 6',
    });

    const response = await listPaginationCities.execute(citySearch, 1, user_id);

    expect(response).toHaveLength(1);
  });
});
