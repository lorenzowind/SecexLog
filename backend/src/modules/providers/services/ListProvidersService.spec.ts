import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '../repositories/drafts/DraftProvidersRepository';

import ListProvidersService from './ListProvidersService';

let draftProvidersRepository: DraftProvidersRepository;
let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    draftProvidersRepository = new DraftProvidersRepository();
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listProviders = new ListProvidersService(
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

    await expect(listProviders.execute(null)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all the providers', async () => {
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

    await listProviders.execute(user_id);

    const response = await listProviders.execute(user_id);

    expect(response).toHaveLength(2);
  });
});
