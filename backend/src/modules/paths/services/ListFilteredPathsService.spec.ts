import AppError from '@shared/errors/AppError';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '@modules/providers/repositories/drafts/DraftProvidersRepository';
import DraftPathsRepository from '../repositories/drafts/DraftPathsRepository';

import ListFilteredPathsService from './ListFilteredPathsService';

let draftPathsRepository: DraftPathsRepository;
let draftProvidersRepository: DraftProvidersRepository;
let draftModalsRepository: DraftModalsRepository;
let draftCitiesRepository: DraftCitiesRepository;

let listFilteredPaths: ListFilteredPathsService;

describe('ListFilteredPaths', () => {
  beforeEach(() => {
    draftPathsRepository = new DraftPathsRepository();
    draftCitiesRepository = new DraftCitiesRepository();
    draftModalsRepository = new DraftModalsRepository();
    draftProvidersRepository = new DraftProvidersRepository();

    listFilteredPaths = new ListFilteredPathsService(
      draftPathsRepository,
      draftCitiesRepository,
    );
  });

  it('should be able to list the filtered paths', async () => {
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
      boarding_times: '12:30, 12:30',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    const originResponse = await listFilteredPaths.execute(
      originCity.name,
      'origin_city',
    );

    const destinationResponse = await listFilteredPaths.execute(
      destinationCity.name,
      'destination_city',
    );

    expect(originResponse).toHaveLength(1);

    expect(destinationResponse).toHaveLength(1);
  });

  it('should not be able to list a filtered path with non existing origin city', async () => {
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

    const response = await listFilteredPaths.execute(
      'non existing city name',
      'origin_city',
    );

    expect(response).toHaveLength(0);
  });

  it('should not be able to list a filtered path with non existing destination city', async () => {
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
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
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

    const response = await listFilteredPaths.execute(
      'non existing city name',
      'destination_city',
    );

    expect(response).toHaveLength(0);
  });
});
