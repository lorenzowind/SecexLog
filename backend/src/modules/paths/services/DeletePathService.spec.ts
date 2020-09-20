import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '@modules/providers/repositories/drafts/DraftProvidersRepository';
import DraftPathsRepository from '../repositories/drafts/DraftPathsRepository';

import DeletePathService from './DeletePathService';

let draftPathsRepository: DraftPathsRepository;
let draftCitiesRepository: DraftCitiesRepository;
let draftModalsRepository: DraftModalsRepository;
let draftProvidersRepository: DraftProvidersRepository;

let draftCacheProvider: DraftCacheProvider;

let deletePath: DeletePathService;

describe('DeletePath', () => {
  beforeEach(() => {
    draftPathsRepository = new DraftPathsRepository();
    draftCitiesRepository = new DraftCitiesRepository();
    draftModalsRepository = new DraftModalsRepository();
    draftProvidersRepository = new DraftProvidersRepository();

    draftCacheProvider = new DraftCacheProvider();

    deletePath = new DeletePathService(
      draftPathsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing path', async () => {
    await expect(
      deletePath.execute('non existing path id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a path', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const provider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const path = await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: modal.id,
      provider_id: provider.id,
      boarding_days: 'Monday, Tuesday',
      boarding_times: '12:30, 12:30',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await deletePath.execute(path.id);

    expect(await draftPathsRepository.findById(path.id)).toBe(undefined);
  });
});
