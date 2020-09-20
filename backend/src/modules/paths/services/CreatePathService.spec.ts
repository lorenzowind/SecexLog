import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '@modules/providers/repositories/drafts/DraftProvidersRepository';
import DraftPathsRepository from '../repositories/drafts/DraftPathsRepository';

import CreatePathService from './CreatePathService';

let draftPathsRepository: DraftPathsRepository;
let draftProvidersRepository: DraftProvidersRepository;
let draftModalsRepository: DraftModalsRepository;
let draftCitiesRepository: DraftCitiesRepository;

let draftCacheProvider: DraftCacheProvider;

let createPath: CreatePathService;

describe('CreatePath', () => {
  beforeEach(() => {
    draftPathsRepository = new DraftPathsRepository();
    draftCitiesRepository = new DraftCitiesRepository();
    draftModalsRepository = new DraftModalsRepository();
    draftProvidersRepository = new DraftProvidersRepository();

    draftCacheProvider = new DraftCacheProvider();

    createPath = new CreatePathService(
      draftPathsRepository,
      draftCitiesRepository,
      draftModalsRepository,
      draftProvidersRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new path', async () => {
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

    const path = await createPath.execute({
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

    expect(path).toHaveProperty('id');
  });

  it('should not be able to create a new path with non existing origin city id', async () => {
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
      createPath.execute({
        origin_city_id: 'non existing city id',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new path with non existing destination city id', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
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
      createPath.execute({
        origin_city_id: originCity.id,
        destination_city_id: 'non existing destination city id',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new path with non existing modal id', async () => {
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
      createPath.execute({
        origin_city_id: originCity.id,
        destination_city_id: destinationCity.id,
        modal_id: 'non existing modal id',
        provider_id: provider.id,
        boarding_days: 'Monday, Tuesday',
        boarding_times: '12:30, 12:30',
        duration: 120,
        mileage: 60,
        cost: 120,
        boarding_place: 'Boarding place',
        departure_place: 'Departure place',
        is_hired: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new path with non existing provider id', async () => {
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

    await expect(
      createPath.execute({
        origin_city_id: originCity.id,
        destination_city_id: destinationCity.id,
        modal_id: modal.id,
        provider_id: 'non existing provider id',
        boarding_days: 'Monday, Tuesday',
        boarding_times: '12:30, 12:30',
        duration: 120,
        mileage: 60,
        cost: 120,
        boarding_place: 'Boarding place',
        departure_place: 'Departure place',
        is_hired: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
