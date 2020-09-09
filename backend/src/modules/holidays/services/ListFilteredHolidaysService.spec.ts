import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftHolidaysRepository from '../repositories/drafts/DraftHolidaysRepository';

import ListFilteredHolidaysService from './ListFilteredHolidaysService';

let draftCitiesRepository: DraftCitiesRepository;
let draftHolidaysRepository: DraftHolidaysRepository;

let listFilteredHolidays: ListFilteredHolidaysService;

describe('ListFilteredHolidays', () => {
  beforeEach(() => {
    draftHolidaysRepository = new DraftHolidaysRepository();
    draftCitiesRepository = new DraftCitiesRepository();

    listFilteredHolidays = new ListFilteredHolidaysService(
      draftHolidaysRepository,
      draftCitiesRepository,
    );
  });

  it('should be able to list all the filtered holidays', async () => {
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

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '15/06',
      end_date: '16/06',
      city_id: firstCity.id,
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '15/06',
      end_date: '16/06',
      city_id: secondCity.id,
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      initial_date: '15/06',
      end_date: '16/06',
      city_id: firstCity.id,
    });

    const response = await listFilteredHolidays.execute(firstCity.id);

    expect(response).toHaveLength(2);
  });

  it('should not be able to list filtered holidays with non existing city id', async () => {
    await expect(
      listFilteredHolidays.execute('non existing city id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
