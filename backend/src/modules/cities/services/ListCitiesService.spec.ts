import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '../repositories/drafts/DraftCitiesRepository';

import ListCitiesService from './ListCitiesService';

let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let listCities: ListCitiesService;

describe('ListCities', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    listCities = new ListCitiesService(
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

    const response = await listCities.execute(null);

    expect(response).toHaveLength(2);
  });

  it('should be able to list all the cities', async () => {
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

    await listCities.execute(user_id);

    const response = await listCities.execute(user_id);

    expect(response).toHaveLength(2);
  });
});
