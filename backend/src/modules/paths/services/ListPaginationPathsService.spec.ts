import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '@modules/providers/repositories/drafts/DraftProvidersRepository';
import DraftPathsRepository from '../repositories/drafts/DraftPathsRepository';

import ListPaginationPathsService from './ListPaginationPathsService';

let draftPathsRepository: DraftPathsRepository;
let draftCitiesRepository: DraftCitiesRepository;
let draftModalsRepository: DraftModalsRepository;
let draftProvidersRepository: DraftProvidersRepository;

let draftCacheProvider: DraftCacheProvider;

let listPaginationPaths: ListPaginationPathsService;

describe('ListPaginationPaths', () => {
  beforeEach(() => {
    draftPathsRepository = new DraftPathsRepository();
    draftCitiesRepository = new DraftCitiesRepository();
    draftModalsRepository = new DraftModalsRepository();
    draftProvidersRepository = new DraftProvidersRepository();

    draftCacheProvider = new DraftCacheProvider();

    listPaginationPaths = new ListPaginationPathsService(
      draftPathsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to list paths without authentication', async () => {
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

    await draftPathsRepository.create({
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

    await expect(listPaginationPaths.execute(1, null)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to list all the paths from the first page', async () => {
    const user_id = 'authenticated user id';

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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
      modal_id: modal.id,
      provider_id: provider.id,
      boarding_days: 'Monday, Tuesday',
      boarding_times: '14:30, 14:30',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place 2',
      departure_place: 'Departure place 2',
      is_hired: true,
    });

    const response = await listPaginationPaths.execute(1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

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

    await draftPathsRepository.create({
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

    const response = await listPaginationPaths.execute(-1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list paths from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

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

    await draftPathsRepository.create({
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

    const response = await listPaginationPaths.execute(2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same paths if the same request is made', async () => {
    const user_id = 'authenticated user id';

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

    await draftPathsRepository.create({
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

    await listPaginationPaths.execute(1, user_id);

    const response = await listPaginationPaths.execute(1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate paths from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

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

    await draftPathsRepository.create({
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

    await listPaginationPaths.execute(1, user_id);

    const response = await listPaginationPaths.execute(2, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the paths', async () => {
    const user_id = 'authenticated user id';

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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await draftPathsRepository.create({
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

    await listPaginationPaths.execute(1, user_id);

    const response = await listPaginationPaths.execute(2, user_id);

    expect(response).toHaveLength(12);
  });
});
