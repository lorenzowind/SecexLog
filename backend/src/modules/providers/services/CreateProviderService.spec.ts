import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '../repositories/drafts/DraftProvidersRepository';

import CreateProviderService from './CreateProviderService';

let draftProvidersRepository: DraftProvidersRepository;
let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;
let createProvider: CreateProviderService;

describe('CreateProvider', () => {
  beforeEach(() => {
    draftProvidersRepository = new DraftProvidersRepository();
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    createProvider = new CreateProviderService(
      draftProvidersRepository,
      draftModalsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new provider', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const provider = await createProvider.execute({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    expect(provider).toHaveProperty('id');
  });

  it('should not be able to create a new provider with the same name from another', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await createProvider.execute({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await expect(
      createProvider.execute({
        name: 'Provider Name',
        modal_id: modal.id,
        preference: 'CPF',
        preference_data: 'Preference data 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new provider with the same email from another', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await createProvider.execute({
      name: 'Provider Name',
      modal_id: modal.id,
      email: 'provider@email.com',
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await expect(
      createProvider.execute({
        name: 'Provider Name 2',
        modal_id: modal.id,
        email: 'provider@email.com',
        preference: 'CPF',
        preference_data: 'Preference data 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new provider with the same phone number from another', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await createProvider.execute({
      name: 'Provider Name',
      modal_id: modal.id,
      phone_number: '(999)99999-9999',
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await expect(
      createProvider.execute({
        name: 'Provider Name 2',
        modal_id: modal.id,
        phone_number: '(999)99999-9999',
        preference: 'CPF',
        preference_data: 'Preference data 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new provider with the same preference data from another', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await createProvider.execute({
      name: 'Provider Name',
      modal_id: modal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await expect(
      createProvider.execute({
        name: 'Provider Name 2',
        modal_id: modal.id,
        preference: 'CPF',
        preference_data: 'Preference data',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new provider with a non existing modal', async () => {
    await expect(
      createProvider.execute({
        name: 'Provider Name',
        modal_id: 'non existing modal id',
        preference: 'CPF',
        preference_data: 'Preference data',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
