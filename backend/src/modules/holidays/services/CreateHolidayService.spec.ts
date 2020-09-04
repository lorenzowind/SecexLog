import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftHolidayRepository from '../repositories/drafts/DraftHolidaysRepository';

import CreateHolidayService from './CreateHolidayService';

let draftCitiesRepository: DraftHolidayRepository;

let draftCacheProvider: DraftCacheProvider;
let createHoliday: CreateHolidayService;

describe('CreateHoliday', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftHolidayRepository();
    draftCacheProvider = new DraftCacheProvider();

    createHoliday = new CreateHolidayService(
      draftCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new holiday', async () => {
    const holiday = await createHoliday.execute({
      name: 'Holiday 1',
      city_name: 'Manaus',
      initial_date: '15/06/20',
      end_date:'16/06/20'
    });

    expect(holiday).toHaveProperty('id');
  });

  it('should not be able to create a new holiday with the same name from another', async () => {
    await createHoliday.execute({
      name: 'City 1',
      city_name: 'Manaus',
      initial_date: '15/06/20',
      end_date:'16/06/20'
    });

    await expect(
      createHoliday.execute({
        name: 'City 1',
        city_name: 'Manaus',
      initial_date: '15/06/20',
      end_date:'16/06/20'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  /*
  it('should be able to create a new holiday with related cities names', async () => {
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
  */
});
