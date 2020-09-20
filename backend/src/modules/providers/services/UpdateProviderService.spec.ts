import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '../repositories/drafts/DraftProvidersRepository';

import UpdateProviderService from './UpdateProviderService';

let draftModalsRepository: DraftModalsRepository;
let draftProvidersRepository: DraftProvidersRepository;

let draftCacheProvider: DraftCacheProvider;

let updateProvider: UpdateProviderService;

describe('UpdateProvider', () => {
  beforeEach(() => {
    draftModalsRepository = new DraftModalsRepository();
    draftProvidersRepository = new DraftProvidersRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateProvider = new UpdateProviderService(
      draftProvidersRepository,
      draftModalsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the provider', async () => {
    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const secondModal = await draftModalsRepository.create({
      name: 'Modal 2',
      image: 'Modal image URL 2',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const provider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const updatedProvider = await updateProvider.execute({
      id: provider.id,
      name: 'Provider Name 2',
      modal_id: secondModal.id,
      preference: 'CNPJ',
      preference_data: 'Preference data 2',
    });

    expect(updatedProvider.name).toBe('Provider Name 2');
    expect(updatedProvider.preference).toBe('CNPJ');
    expect(updatedProvider.preference_data).toBe('Preference data 2');
    expect(updatedProvider.modal_id).toBe(secondModal.id);
  });

  it('should be able to update the provider with all attributes', async () => {
    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const secondModal = await draftModalsRepository.create({
      name: 'Modal 2',
      image: 'Modal image URL 2',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const provider = await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    const updatedProvider = await updateProvider.execute({
      id: provider.id,
      name: 'Provider Name 2',
      email: 'provider@email.com',
      phone_number: '(999)99999-9999',
      modal_id: secondModal.id,
      preference: 'CNPJ',
      preference_data: 'Preference data 2',
    });

    expect(updatedProvider.name).toBe('Provider Name 2');
    expect(updatedProvider.preference).toBe('CNPJ');
    expect(updatedProvider.preference_data).toBe('Preference data 2');
    expect(updatedProvider.email).toBe('provider@email.com');
    expect(updatedProvider.phone_number).toBe('(999)99999-9999');
    expect(updatedProvider.modal_id).toBe(secondModal.id);
  });

  it('should not be able to update from a non existing provider', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await expect(
      updateProvider.execute({
        id: 'non existing provider id',
        name: 'Provider Name 2',
        modal_id: modal.id,
        preference: 'CNPJ',
        preference_data: 'Preference data 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another provider name', async () => {
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

    await expect(
      updateProvider.execute({
        id: provider.id,
        name: 'Provider Name 2',
        modal_id: modal.id,
        preference: 'CNPJ',
        preference_data: 'Preference data',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another provider email', async () => {
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
      email: 'provider@email.com',
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: modal.id,
      email: 'provider2@email.com',
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await expect(
      updateProvider.execute({
        id: provider.id,
        name: 'Provider Name',
        modal_id: modal.id,
        email: 'provider2@email.com',
        preference: 'CNPJ',
        preference_data: 'Preference data',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another provider phone number', async () => {
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
      phone_number: '(999)99999-9999',
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: modal.id,
      phone_number: '(111)99999-9999',
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await expect(
      updateProvider.execute({
        id: provider.id,
        name: 'Provider Name',
        modal_id: modal.id,
        phone_number: '(111)99999-9999',
        preference: 'CNPJ',
        preference_data: 'Preference data',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another provider preference data', async () => {
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

    await expect(
      updateProvider.execute({
        id: provider.id,
        name: 'Provider Name',
        modal_id: modal.id,
        preference: 'CNPJ',
        preference_data: 'Preference data 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a provider with a non existing modal', async () => {
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
      updateProvider.execute({
        id: provider.id,
        name: 'Provider Name',
        modal_id: 'non existing modal id',
        preference: 'CPF',
        preference_data: 'Preference data',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
