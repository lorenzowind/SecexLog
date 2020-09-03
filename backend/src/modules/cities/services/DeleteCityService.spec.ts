import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '../repositories/drafts/DraftCitiesRepository';

import DeleteCityService from './DeleteCityService';

let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteCity: DeleteCityService;

describe('DeleteCity', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteCity = new DeleteCityService(
      draftCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing city', async () => {
    await expect(
      deleteCity.execute('Non existing city id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a city', async () => {
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

    const city = await draftCitiesRepository.create({
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

    await deleteCity.execute(city.id);

    expect(await draftCitiesRepository.findById(city.id)).toBe(undefined);
  });
});
