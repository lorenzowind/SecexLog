import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '../repositories/drafts/DraftCitiesRepository';
import DraftRelatedCitiesRepository from '../repositories/drafts/DraftRelatedCitiesRepository';

import UpdateCityService from './UpdateCityService';

let draftCitiesRepository: DraftCitiesRepository;
let draftRelatedCitiesRepository: DraftRelatedCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let updateCity: UpdateCityService;

describe('UpdateCity', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftCitiesRepository();
    draftRelatedCitiesRepository = new DraftRelatedCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateCity = new UpdateCityService(
      draftCitiesRepository,
      draftRelatedCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the city', async () => {
    const city = await draftCitiesRepository.create({
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

    const updatedCity = await updateCity.execute({
      id: city.id,
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

    expect(updatedCity.name).toBe('City 2');
    expect(updatedCity.city_observation).toBe('city observation 2');
    expect(updatedCity.interdiction_observation).toBe(
      'interdiction observation 2',
    );
  });

  it('should not be able to update from a non existing city', async () => {
    expect(
      updateCity.execute({
        id: 'non existing city',
        name: 'City 1',
        city_observation: 'city observation 1',
        end_flood_date: '01/09',
        initial_flood_date: '01/07',
        interdiction_observation: 'interdiction observation 1',
        is_auditated: true,
        is_base: false,
        latitude: 1.35235235,
        longitude: -1.12467552,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another city name', async () => {
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

    await expect(
      updateCity.execute({
        id: city.id,
        name: 'City 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a city with new related city', async () => {
    const firstCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const secondCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const updatedCity = await updateCity.execute({
      id: firstCity.id,
      name: 'City 1',
      related_cities: [
        {
          related_city_id: secondCity.id,
        },
      ],
    });

    expect(
      await draftRelatedCitiesRepository.findAllByCityId(updatedCity.id),
    ).toHaveLength(1);
  });

  it('should not be able to update a city with itself as a related city', async () => {
    const city = await draftCitiesRepository.create({
      name: 'City 1',
    });

    await expect(
      updateCity.execute({
        id: city.id,
        name: 'City 1',
        related_cities: [
          {
            related_city_id: city.id,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update new related cities', async () => {
    const firstCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const secondCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const thirdCity = await draftCitiesRepository.create({
      name: 'City 3',
    });

    const fourthCity = await draftCitiesRepository.create({
      name: 'City 4',
    });

    await updateCity.execute({
      id: firstCity.id,
      name: 'City 1',
      related_cities: [
        {
          related_city_id: secondCity.id,
        },
        {
          related_city_id: thirdCity.id,
        },
      ],
    });

    await updateCity.execute({
      id: firstCity.id,
      name: 'City 1',
      related_cities: [
        {
          related_city_id: fourthCity.id,
        },
      ],
    });

    expect(
      await draftRelatedCitiesRepository.findAllByCityId(firstCity.id),
    ).toHaveLength(1);
  });

  it('should not be able to update a city with invalid related cities names', async () => {
    const city = await draftCitiesRepository.create({
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
      updateCity.execute({
        id: city.id,
        name: 'City 1',
        city_observation: 'city observation',
        end_flood_date: '01/09',
        initial_flood_date: '01/07',
        interdiction_observation: 'interdiction observation',
        is_auditated: true,
        is_base: false,
        latitude: 1.35235235,
        longitude: -1.12467552,
        related_cities: [
          {
            related_city_id: 'non existing related city id',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
