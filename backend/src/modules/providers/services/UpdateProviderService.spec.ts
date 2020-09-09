import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import UpdateHolidaysService from './UpdateProviderService';

let draftHolidaysRepository: DraftHolidaysRepository;
let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let updateHoliday: UpdateHolidaysService;

describe('UpdateHoliday', () => {
  beforeEach(() => {
    draftHolidaysRepository = new DraftHolidaysRepository();
    draftCitiesRepository = new DraftCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateHoliday = new UpdateHolidaysService(
      draftHolidaysRepository,
      draftCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the holiday', async () => {
    const holiday = await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const updatedHoliday = await updateHoliday.execute({
      id: holiday.id,
      name: 'New Holiday 1',
      initial_date: '11/08',
      end_date: '12/08',
    });

    expect(updatedHoliday.name).toBe('New Holiday 1');
    expect(updatedHoliday.initial_date).toBe('11/08');
    expect(updatedHoliday.end_date).toBe('12/08');
  });

  it('should not be able to update from a non existing holiday', async () => {
    expect(
      updateHoliday.execute({
        id: 'non existing holiday',
        name: 'New Holiday 1',

        initial_date: '11/08',
        end_date: '12/08',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another holiday name', async () => {
    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const holiday = await draftHolidaysRepository.create({
      name: 'Holiday 2',
      initial_date: '11/08',
      end_date: '12/08',
    });

    await expect(
      updateHoliday.execute({
        id: holiday.id,
        name: 'Holiday 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the specific holiday', async () => {
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

    const holiday = await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    const updatedHoliday = await updateHoliday.execute({
      id: holiday.id,
      name: 'New Holiday 1',
      city_id: city.id,
      initial_date: '11/06',
      end_date: '12/06',
    });

    expect(updatedHoliday.name).toBe('New Holiday 1');
    expect(updatedHoliday.city_id).toBe(city.id);
    expect(updatedHoliday.initial_date).toBe('11/06');
    expect(updatedHoliday.end_date).toBe('12/06');
  });

  it('should not be able to update a specific holiday with a non existing city', async () => {
    const holiday = await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '09/08',
      end_date: '10/08',
    });

    await expect(
      updateHoliday.execute({
        id: holiday.id,
        name: 'New Holiday 1',
        city_id: 'non existing city id',
        initial_date: '11/08',
        end_date: '12/08',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
