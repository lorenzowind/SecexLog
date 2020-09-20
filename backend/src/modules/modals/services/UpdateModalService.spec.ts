import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '../repositories/drafts/DraftModalsRepository';

import UpdateModalService from './UpdateModalService';

let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let updateModal: UpdateModalService;

describe('UpdateCity', () => {
  beforeEach(() => {
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateModal = new UpdateModalService(
      draftModalsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the modal', async () => {
    const modal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const updatedModal = await updateModal.execute({
      id: modal.id,
      name: 'Modal 2',
      image: 'New modal image URL',
      is_safe: false,
      is_cheap: false,
      is_fast: false,
    });

    expect(updatedModal.name).toBe('Modal 2');
    expect(updatedModal.image).toBe('New modal image URL');
    expect(updatedModal.is_safe).toBe(false);
    expect(updatedModal.is_cheap).toBe(false);
    expect(updatedModal.is_fast).toBe(false);
  });

  it('should not be able to update from a non existing modal', async () => {
    expect(
      updateModal.execute({
        id: 'non existing modal id',
        name: 'Modal 1',
        image: 'Modal image URL',
        is_safe: true,
        is_cheap: true,
        is_fast: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another modal name', async () => {
    await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const modal = await draftModalsRepository.create({
      name: 'Modal 2',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await expect(
      updateModal.execute({
        id: modal.id,
        name: 'Modal 1',
        image: 'Modal image URL',
        is_safe: true,
        is_cheap: true,
        is_fast: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
