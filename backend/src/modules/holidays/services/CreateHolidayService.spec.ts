import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import CreateHolidayService from './CreateHolidayService';

let draftHolidaysRepository: DraftHolidaysRepository;
let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;
let createHoliday: CreateHolidayService;

describe('CreateHoliday', () => {
  beforeEach(() => {
    draftHolidaysRepository = new DraftHolidaysRepository();
    draftCitiesRepository = new DraftCitiesRepository();

    draftCacheProvider = new DraftCacheProvider();

    createHoliday = new CreateHolidayService(
      draftHolidaysRepository,
      draftCitiesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new holiday', async () => {
    const holiday = await createHoliday.execute({
      name: 'Holiday 1',
      initial_date: '15/06',
      end_date: '16/06',
    });

    expect(holiday).toHaveProperty('id');
  });

  it('should not be able to create a new holiday with the same name from another', async () => {
    await createHoliday.execute({
      name: 'Holiday 1',
      initial_date: '15/06',
      end_date: '16/06',
    });

    await expect(
      createHoliday.execute({
        name: 'Holiday 1',
        initial_date: '17/06',
        end_date: '18/06',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new specific holiday', async () => {
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

    const holiday = await createHoliday.execute({
      name: 'Holiday 1',
      city_id: city.id,
      initial_date: '15/06',
      end_date: '16/06',
    });

    expect(holiday).toHaveProperty('id');
  });

  it('should not be able to create a new specific holiday with a non existing city', async () => {
    await expect(
      createHoliday.execute({
        name: 'Holiday 1',
        city_id: 'non existing city id',
        initial_date: '15/06',
        end_date: '16/06',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
