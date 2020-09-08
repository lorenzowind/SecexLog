import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftRelatedCitiesRepository from '../repositories/drafts/DraftRelatedCitiesRepository';
import DraftCitiesRepository from '../repositories/drafts/DraftCitiesRepository';

import ListRelatedCitiesService from './ListRelatedCitiesService';
import CreateCityService from './CreateCityService';

let draftRelatedCitiesRepository: DraftRelatedCitiesRepository;
let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let listRelatedCities: ListRelatedCitiesService;
let createCity: CreateCityService;

describe('ListCities', () => {
  beforeEach(() => {
    draftRelatedCitiesRepository = new DraftRelatedCitiesRepository();
    draftCitiesRepository = new DraftCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    listRelatedCities = new ListRelatedCitiesService(
      draftRelatedCitiesRepository,
      draftCitiesRepository,
    );

    createCity = new CreateCityService(
      draftCitiesRepository,
      draftRelatedCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the related cities', async () => {
    const firstCity = await draftCitiesRepository.create({
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

    const secondCity = await draftCitiesRepository.create({
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

    const thirdCity = await createCity.execute({
      name: 'City 3',
      city_observation: 'city observation',
      end_flood_date: '01/09',
      initial_flood_date: '01/07',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
      related_cities: [
        { related_city_id: firstCity.id },
        { related_city_id: secondCity.id },
      ],
    });

    const response = await listRelatedCities.execute(thirdCity.id);

    expect(response).toHaveLength(2);
  });

  it('should not be able to list related cities with non existing city id', async () => {
    await expect(
      listRelatedCities.execute('non existing city id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
