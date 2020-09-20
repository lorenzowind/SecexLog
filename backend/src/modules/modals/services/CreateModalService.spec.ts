import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '../repositories/drafts/DraftModalsRepository';

import CreateModalService from './CreateModalService';

let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let createModal: CreateModalService;

describe('CreateModal', () => {
  beforeEach(() => {
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    createModal = new CreateModalService(
      draftModalsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new modal', async () => {
    const modal = await createModal.execute({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    expect(modal).toHaveProperty('id');
  });

  it('should not be able to create a new modal with the same name from another', async () => {
    await createModal.execute({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await expect(
      createModal.execute({
        name: 'Modal 1',
        image: 'Modal image URL',
        is_safe: true,
        is_cheap: true,
        is_fast: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
