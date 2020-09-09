import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '../repositories/drafts/DraftProvidersRepository';

import DeleteProviderService from './DeleteProviderService';

let draftProvidersRepository: DraftProvidersRepository;
let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteProvider: DeleteProviderService;

describe('DeleteProvider', () => {
  beforeEach(() => {
    draftProvidersRepository = new DraftProvidersRepository();
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteProvider = new DeleteProviderService(
      draftProvidersRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing provider', async () => {
    await expect(
      deleteProvider.execute('Non existing provider id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a provider', async () => {
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

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await deleteProvider.execute(provider.id);

    expect(await draftProvidersRepository.findById(provider.id)).toBe(
      undefined,
    );
  });
});
