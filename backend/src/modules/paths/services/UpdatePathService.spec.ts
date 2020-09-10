import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '@modules/providers/repositories/drafts/DraftProvidersRepository';
import DraftPathsRepository from '../repositories/drafts/DraftPathsRepository';

import UpdatePathService from './UpdatePathService';

let draftPathsRepository: DraftPathsRepository;
let draftProvidersRepository: DraftProvidersRepository;
let draftModalsRepository: DraftModalsRepository;
let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let updatePath: UpdatePathService;

describe('UpdatePath', () => {
  beforeEach(() => {
    draftPathsRepository = new DraftPathsRepository();
    draftCitiesRepository = new DraftCitiesRepository();
    draftModalsRepository = new DraftModalsRepository();
    draftProvidersRepository = new DraftProvidersRepository();

    draftCacheProvider = new DraftCacheProvider();

    updatePath = new UpdatePathService(
      draftPathsRepository,
      draftCitiesRepository,
      draftModalsRepository,
      draftProvidersRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the path', async () => {
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

    const updatedPath = await updatePath.execute({
      id: path.id,
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: modal.id,
      provider_id: provider.id,
      boarding_days: 'Wednesday, Thursday',
      boarding_times: '14:30, 14:30',
      duration: 60,
      mileage: 60,
      cost: 340,
      boarding_place: 'Boarding place 2',
      departure_place: 'Departure place 2',
      is_hired: false,
    });

    expect(updatedPath.boarding_days).toBe('Wednesday, Thursday');
    expect(updatedPath.boarding_times).toBe('14:30, 14:30');
    expect(updatedPath.duration).toBe(60);
    expect(updatedPath.cost).toBe(340);
    expect(updatedPath.boarding_place).toBe('Boarding place 2');
    expect(updatedPath.departure_place).toBe('Departure place 2');
    expect(updatedPath.is_hired).toBe(false);
  });

  it('should not be able to update from a non existing path', async () => {
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

    await expect(
      updatePath.execute({
        id: 'non existing path id',
        origin_city_id: originCity.id,
        destination_city_id: destinationCity.id,
        modal_id: modal.id,
        provider_id: provider.id,
        boarding_days: 'Wednesday, Thursday',
        boarding_times: '14:30, 14:30',
        duration: 60,
        mileage: 60,
        cost: 340,
        boarding_place: 'Boarding place 2',
        departure_place: 'Departure place 2',
        is_hired: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a path with a non existing origin city id', async () => {
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

    await expect(
      updatePath.execute({
        id: path.id,
        origin_city_id: 'non existing origin city id',
        destination_city_id: destinationCity.id,
        modal_id: modal.id,
        provider_id: provider.id,
        boarding_days: 'Wednesday, Thursday',
        boarding_times: '14:30, 14:30',
        duration: 60,
        mileage: 60,
        cost: 340,
        boarding_place: 'Boarding place 2',
        departure_place: 'Departure place 2',
        is_hired: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a path with a non existing destination city id', async () => {
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

    await expect(
      updatePath.execute({
        id: path.id,
        origin_city_id: originCity.id,
        destination_city_id: 'non existing destination city id',
        modal_id: modal.id,
        provider_id: provider.id,
        boarding_days: 'Wednesday, Thursday',
        boarding_times: '14:30, 14:30',
        duration: 60,
        mileage: 60,
        cost: 340,
        boarding_place: 'Boarding place 2',
        departure_place: 'Departure place 2',
        is_hired: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a path with a non existing modal id', async () => {
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

    await expect(
      updatePath.execute({
        id: path.id,
        origin_city_id: originCity.id,
        destination_city_id: destinationCity.id,
        modal_id: 'non existing modal id',
        provider_id: provider.id,
        boarding_days: 'Wednesday, Thursday',
        boarding_times: '14:30, 14:30',
        duration: 60,
        mileage: 60,
        cost: 340,
        boarding_place: 'Boarding place 2',
        departure_place: 'Departure place 2',
        is_hired: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a path with a non existing provider id', async () => {
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

    await expect(
      updatePath.execute({
        id: path.id,
        origin_city_id: originCity.id,
        destination_city_id: destinationCity.id,
        modal_id: modal.id,
        provider_id: 'non existing provider id',
        boarding_days: 'Wednesday, Thursday',
        boarding_times: '14:30, 14:30',
        duration: 60,
        mileage: 60,
        cost: 340,
        boarding_place: 'Boarding place 2',
        departure_place: 'Departure place 2',
        is_hired: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
