import AppError from '@shared/errors/AppError';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftHolidaysRepository from '@modules/holidays/repositories/drafts/DraftHolidaysRepository';
import DraftPathsRepository from '@modules/paths/repositories/drafts/DraftPathsRepository';
import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '@modules/providers/repositories/drafts/DraftProvidersRepository';

import ManualSearchService from './ManualSearchService';

let draftCitiesRepository: DraftCitiesRepository;
let draftHolidaysRepository: DraftHolidaysRepository;
let draftPathsRepository: DraftPathsRepository;
let draftModalsRepository: DraftModalsRepository;
let draftProvidersRepository: DraftProvidersRepository;

let manualSearch: ManualSearchService;

describe('ManualSearch', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftCitiesRepository();
    draftHolidaysRepository = new DraftHolidaysRepository();
    draftPathsRepository = new DraftPathsRepository();
    draftModalsRepository = new DraftModalsRepository();
    draftProvidersRepository = new DraftProvidersRepository();

    manualSearch = new ManualSearchService(
      draftCitiesRepository,
      draftHolidaysRepository,
      draftPathsRepository,
      draftModalsRepository,
      draftProvidersRepository,
    );
  });

  it('should be able to search for paths with simple cities', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira',
      boarding_times: '14:00',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira',
      boarding_times: '14:00',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    const response = await manualSearch.execute({
      data: [
        {
          origin_city_id: originCity.id,
          destination_city_id: destinationCity.id,
          date: '28/09/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: originCity.id,
          date: '05/10/2020',
        },
      ],
    });

    expect(response.result.general_info.initial_date).toBe('28/09/2020');
    expect(response.result.general_info.final_date).toBe('05/10/2020');
  });

  it('should not be able to search for paths with an impossible time', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira',
      boarding_times: '14:00',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira',
      boarding_times: '14:30, 15:30',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    const response = await manualSearch.execute({
      data: [
        {
          origin_city_id: originCity.id,
          destination_city_id: destinationCity.id,
          date: '28/09/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: originCity.id,
          date: '28/09/2020',
        },
      ],
    });

    expect(response.result.paths_result).toHaveLength(1);
  });

  it('should not be able to search for paths with non paths registered', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const response = await manualSearch.execute({
      data: [
        {
          origin_city_id: originCity.id,
          destination_city_id: destinationCity.id,
          date: '28/09/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: originCity.id,
          date: '28/09/2020',
        },
      ],
    });

    expect(response.result.paths_result).toHaveLength(0);
  });

  it('should not be able to search for paths with non availability', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Quarta-feira',
      boarding_times: '14:00',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Quinta-feira',
      boarding_times: '14:30',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    const response = await manualSearch.execute({
      data: [
        {
          origin_city_id: originCity.id,
          destination_city_id: destinationCity.id,
          date: '29/09/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: originCity.id,
          date: '30/09/2020',
        },
      ],
    });

    expect(response.result.paths_result).toHaveLength(0);
  });

  it('should not be able to search for paths with non existing city', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira',
      boarding_times: '14:00',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira',
      boarding_times: '14:30, 15:30',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await expect(
      manualSearch.execute({
        data: [
          {
            origin_city_id: 'non existing origin city id',
            destination_city_id: destinationCity.id,
            date: '28/09/2020',
          },
          {
            origin_city_id: destinationCity.id,
            destination_city_id: originCity.id,
            date: '28/09/2020',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      manualSearch.execute({
        data: [
          {
            origin_city_id: originCity.id,
            destination_city_id: 'non existing destination city id',
            date: '28/09/2020',
          },
          {
            origin_city_id: destinationCity.id,
            destination_city_id: originCity.id,
            date: '28/09/2020',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to search for paths with invalid data', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira',
      boarding_times: '14:00',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira',
      boarding_times: '14:30, 15:30',
      duration: 60,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await expect(
      manualSearch.execute({
        data: [
          {
            origin_city_id: originCity.id,
            destination_city_id: originCity.id,
            date: '28/09/2020',
          },
          {
            origin_city_id: destinationCity.id,
            destination_city_id: originCity.id,
            date: '28/09/2020',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      manualSearch.execute({
        data: [
          {
            origin_city_id: originCity.id,
            destination_city_id: destinationCity.id,
            date: '28/09/2020',
          },
          {
            origin_city_id: originCity.id,
            destination_city_id: destinationCity.id,
            date: '28/09/2020',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      manualSearch.execute({
        data: [
          {
            origin_city_id: originCity.id,
            destination_city_id: destinationCity.id,
            date: '28/09/2020',
          },
          {
            origin_city_id: destinationCity.id,
            destination_city_id: originCity.id,
            date: '27/09/2020',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to search for 2 paths', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      initial_flood_date: '20/09',
      end_flood_date: '20/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 2',
      city_observation: 'city observation',
      initial_flood_date: '20/09',
      end_flood_date: '20/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_id: destinationCity.id,
      initial_date: '22/09',
      end_date: '23/09',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const secondModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const secondProvider = await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: secondModal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira, Terça-feira, Sexta-feira, Domingo',
      boarding_times: '14:00, 14:00, 14:00, 14:00',
      duration: 180,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: originCity.id,
      modal_id: secondModal.id,
      provider_id: secondProvider.id,
      boarding_days: 'Segunda-feira, Terça-feira, Sexta-feira, Domingo',
      boarding_times: '14:00, 14:00, 14:00, 14:00',
      duration: 35,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    const response = await manualSearch.execute({
      data: [
        {
          origin_city_id: originCity.id,
          destination_city_id: destinationCity.id,
          date: '28/09/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: originCity.id,
          date: '29/09/2020',
        },
        {
          origin_city_id: originCity.id,
          destination_city_id: destinationCity.id,
          date: '02/10/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: originCity.id,
          date: '04/10/2020',
        },
      ],
    });

    expect(response.result.general_info.initial_date).toBe('28/09/2020');
    expect(response.result.general_info.final_date).toBe('04/10/2020');
  });

  it('should be able to search for 3 paths', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      initial_flood_date: '20/09',
      end_flood_date: '20/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const intermediateCity = await draftCitiesRepository.create({
      name: 'City 2',
      city_observation: 'city observation',
      initial_flood_date: '22/09',
      end_flood_date: '22/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 3',
      city_observation: 'city observation',
      initial_flood_date: '24/09',
      end_flood_date: '24/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_id: intermediateCity.id,
      initial_date: '22/09',
      end_date: '23/09',
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 2',
      city_id: destinationCity.id,
      initial_date: '24/09',
      end_date: '25/09',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const secondModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const thirdModal = await draftModalsRepository.create({
      name: 'Modal 3',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const secondProvider = await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: secondModal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    const thirdProvider = await draftProvidersRepository.create({
      name: 'Provider Name 3',
      modal_id: thirdModal.id,
      preference: 'CPF',
      preference_data: 'Preference data 3',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: intermediateCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira, Segunda-feira',
      boarding_times: '10:00, 12:00, 14:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: intermediateCity.id,
      destination_city_id: destinationCity.id,
      modal_id: secondModal.id,
      provider_id: secondProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira',
      boarding_times: '13:00, 18:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: intermediateCity.id,
      modal_id: thirdModal.id,
      provider_id: thirdProvider.id,
      boarding_days: 'Sexta-feira, Sexta-feira',
      boarding_times: '10:00, 12:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: intermediateCity.id,
      destination_city_id: originCity.id,
      modal_id: secondModal.id,
      provider_id: secondProvider.id,
      boarding_days: 'Sexta-feira, Sexta-feira',
      boarding_times: '10:00, 15:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    const response = await manualSearch.execute({
      data: [
        {
          origin_city_id: originCity.id,
          destination_city_id: intermediateCity.id,
          date: '05/10/2020',
        },
        {
          origin_city_id: intermediateCity.id,
          destination_city_id: destinationCity.id,
          date: '05/10/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: intermediateCity.id,
          date: '09/10/2020',
        },
        {
          origin_city_id: intermediateCity.id,
          destination_city_id: originCity.id,
          date: '09/10/2020',
        },
      ],
    });

    expect(response.result.general_info.initial_date).toBe('05/10/2020');
    expect(response.result.general_info.final_date).toBe('09/10/2020');
  });

  it('should be able to search for 3 paths with different providers', async () => {
    const originCity = await draftCitiesRepository.create({
      name: 'City 1',
      city_observation: 'city observation',
      initial_flood_date: '20/09',
      end_flood_date: '20/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const intermediateCity = await draftCitiesRepository.create({
      name: 'City 2',
      city_observation: 'city observation',
      initial_flood_date: '22/09',
      end_flood_date: '22/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    const destinationCity = await draftCitiesRepository.create({
      name: 'City 3',
      city_observation: 'city observation',
      initial_flood_date: '24/09',
      end_flood_date: '24/10',
      interdiction_observation: 'interdiction observation',
      is_auditated: true,
      is_base: false,
      latitude: 1.35235235,
      longitude: -1.12467552,
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 1',
      city_id: intermediateCity.id,
      initial_date: '22/09',
      end_date: '23/09',
    });

    await draftHolidaysRepository.create({
      name: 'Holiday 2',
      city_id: destinationCity.id,
      initial_date: '24/09',
      end_date: '25/09',
    });

    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const secondModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const thirdModal = await draftModalsRepository.create({
      name: 'Modal 3',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const firstProvider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const secondProvider = await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: secondModal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    const thirdProvider = await draftProvidersRepository.create({
      name: 'Provider Name 3',
      modal_id: thirdModal.id,
      preference: 'CPF',
      preference_data: 'Preference data 3',
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: intermediateCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira, Segunda-feira',
      boarding_times: '10:00, 12:00, 14:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: originCity.id,
      destination_city_id: intermediateCity.id,
      modal_id: secondModal.id,
      provider_id: secondProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira, Segunda-feira',
      boarding_times: '11:00, 13:00, 15:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: intermediateCity.id,
      destination_city_id: destinationCity.id,
      modal_id: secondModal.id,
      provider_id: secondProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira',
      boarding_times: '13:00, 18:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: intermediateCity.id,
      destination_city_id: destinationCity.id,
      modal_id: firstModal.id,
      provider_id: firstProvider.id,
      boarding_days: 'Segunda-feira, Segunda-feira',
      boarding_times: '14:00, 19:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: intermediateCity.id,
      modal_id: thirdModal.id,
      provider_id: thirdProvider.id,
      boarding_days: 'Sexta-feira, Sexta-feira',
      boarding_times: '10:00, 12:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: destinationCity.id,
      destination_city_id: intermediateCity.id,
      modal_id: secondModal.id,
      provider_id: secondProvider.id,
      boarding_days: 'Sexta-feira, Sexta-feira',
      boarding_times: '11:00, 13:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: intermediateCity.id,
      destination_city_id: originCity.id,
      modal_id: secondModal.id,
      provider_id: secondProvider.id,
      boarding_days: 'Sexta-feira, Sexta-feira',
      boarding_times: '10:00, 15:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    await draftPathsRepository.create({
      origin_city_id: intermediateCity.id,
      destination_city_id: originCity.id,
      modal_id: thirdModal.id,
      provider_id: thirdProvider.id,
      boarding_days: 'Sexta-feira, Sexta-feira',
      boarding_times: '11:00, 16:00',
      duration: 120,
      mileage: 60,
      cost: 120,
      boarding_place: 'Boarding place',
      departure_place: 'Departure place',
      is_hired: true,
    });

    const response = await manualSearch.execute({
      data: [
        {
          origin_city_id: originCity.id,
          destination_city_id: intermediateCity.id,
          date: '05/10/2020',
        },
        {
          origin_city_id: intermediateCity.id,
          destination_city_id: destinationCity.id,
          date: '05/10/2020',
        },
        {
          origin_city_id: destinationCity.id,
          destination_city_id: intermediateCity.id,
          date: '09/10/2020',
        },
        {
          origin_city_id: intermediateCity.id,
          destination_city_id: originCity.id,
          date: '09/10/2020',
        },
      ],
    });

    expect(response.result.general_info.initial_date).toBe('05/10/2020');
    expect(response.result.general_info.final_date).toBe('09/10/2020');
  });
});
