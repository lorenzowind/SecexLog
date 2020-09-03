import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '../repositories/drafts/DraftCitiesRepository';

import CreateCityService from './CreateCityService';

let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;
let createCity: CreateCityService;

describe('CreateCity', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    createCity = new CreateCityService(
      draftCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new city', async () => {
    const city = await createCity.execute({
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

    expect(city).toHaveProperty('id');
  });

  it('should not be able to create a new city with the same name from another', async () => {
    await createCity.execute({
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

    await expect(
      createCity.execute({
        name: 'City 1',
        city_observation: 'city observation 2',
        end_flood_date: '01/09',
        initial_flood_date: '01/07',
        interdiction_observation: 'interdiction observation 2',
        is_auditated: true,
        is_base: false,
        latitude: 1.34641236,
        longitude: -1.57534345,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new city with related cities names', async () => {
    await createCity.execute({
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

    await createCity.execute({
      name: 'City 2',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const city = await createCity.execute({
      name: 'City 3',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
      related_cities: 'City 1, City 2',
    });

    expect(city).toHaveProperty('id');
  });

  it('should not be able to create a new city with invalid related cities names', async () => {
    await expect(
      createCity.execute({
        name: 'City 1',
        city_observation: 'city observation',
        end_flood_date: '01/09',
        initial_flood_date: '01/07',
        interdiction_observation: 'interdiction observation',
        is_auditated: true,
        is_base: false,
        latitude: 1.35235235,
        longitude: -1.12467552,
        related_cities: 'City 2, City 3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
