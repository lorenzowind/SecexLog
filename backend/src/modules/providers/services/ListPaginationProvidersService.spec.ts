import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '../repositories/drafts/DraftProvidersRepository';

import ListPaginationProvidersService from './ListPaginationProvidersService';

let draftProvidersRepository: DraftProvidersRepository;
let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let listPaginationProviders: ListPaginationProvidersService;

describe('ListPaginationProviders', () => {
  beforeEach(() => {
    draftProvidersRepository = new DraftProvidersRepository();
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listPaginationProviders = new ListPaginationProvidersService(
      draftProvidersRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to list providers without authentication', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await expect(
      listPaginationProviders.execute('', 1, null),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all the providers from the first page', async () => {
    const user_id = 'authenticated user id';

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    const response = await listPaginationProviders.execute('', 1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const response = await listPaginationProviders.execute('', -1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list providers from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const response = await listPaginationProviders.execute('', 2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same providers if the same request is made', async () => {
    const user_id = 'authenticated user id';

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await listPaginationProviders.execute('', 1, user_id);

    const response = await listPaginationProviders.execute('', 1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate providers from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await listPaginationProviders.execute('', 1, user_id);

    const response = await listPaginationProviders.execute('', 2, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the providers', async () => {
    const user_id = 'authenticated user id';

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 3',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 3',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 4',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 4',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 5',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 5',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 6',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 6',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 7',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 7',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 8',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 8',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 9',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 9',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 10',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 10',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 11',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 11',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 12',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 12',
    });

    await listPaginationProviders.execute('', 1, user_id);

    const response = await listPaginationProviders.execute('', 2, user_id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the providers from the first page which includes a search string', async () => {
    const providerSearch = 'Provider Searching';

    const user_id = 'authenticated user id';

    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 3',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 3',
    });

    await draftProvidersRepository.create({
      name: providerSearch,
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 4',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 5',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 5',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 6',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 6',
    });

    const response = await listPaginationProviders.execute(
      providerSearch,
      1,
      user_id,
    );

    expect(response).toHaveLength(1);
  });
});
