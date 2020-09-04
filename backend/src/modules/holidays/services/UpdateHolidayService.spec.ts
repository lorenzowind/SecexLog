import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import UpdateHolidaysService from './UpdateHolidayService';

let draftHolidaysRepository: DraftHolidaysRepository;

let draftCacheProvider: DraftCacheProvider;

let updateHoliday: UpdateHolidaysService;

describe('UpdateHoliday', () => {
  beforeEach(() => {
    draftHolidaysRepository = new DraftHolidaysRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateHoliday = new UpdateHolidaysService(
      draftHolidaysRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the holiday', async () => {
    const holiday = await draftHolidaysRepository.create({
      name: 'City 1',
      end_date: '09/08/2020',
      initial_date:'08/08/2020',
      city_name: 'Belém'
    });

    const updatedHoliday = await updateHoliday.execute({
      id: holiday.id,
      name: 'City 2',
      end_date: '09/08/2020',
      initial_date:'08/08/2020',
      city_name: 'Belém'
    });

    expect(updatedHoliday.city_name).toBe('City 2');
    expect(updatedHoliday.name).toBe('city observation 2');
    expect(updatedHoliday.end_date).toBe(
      '10/08/2020',
    );
  });

  it('should not be able to update from a non existing holiday', async () => {
    expect(
      updateHoliday.execute({
        id: 'non existing city',
        name: 'City 2',
        end_date: '09/08/2020',
        initial_date:'08/08/2020',
        city_name: 'Belém',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another holiday name', async () => {
    await draftHolidaysRepository.create({
      name: 'City 1',
      end_date: '09/08/2020',
      initial_date:'08/08/2020',
      city_name: 'Belém'
    });

    const city = await draftHolidaysRepository.create({
      name: 'City 4',
      end_date: '10/08/2020',
      initial_date:'09/08/2020',
      city_name: 'Belém'
    });

    await expect(
      updateHoliday.execute({
        id: city.id,
        name: 'City 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  /*
  it('should be able to update a city with new related holidays names', async () => {
    const holiday = await draftCitiesRepository.create({
      name: 'City 1',
    });

    await draftCitiesRepository.create({
      name: 'City 2',
    });

    const updatedCity = await updateCity.execute({
      id: holiday.id,
      name: 'City 1',
    });

    expect(updatedCity).toHaveProperty('related_cities');
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
        related_cities: 'City 2, City 3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });*/
  
});
