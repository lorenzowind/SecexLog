import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '../repositories/drafts/DraftModalsRepository';

import DeleteModalService from './DeleteModalService';

let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteModal: DeleteModalService;

describe('DeleteModal', () => {
  beforeEach(() => {
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteModal = new DeleteModalService(
      draftModalsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing modal', async () => {
    await expect(
      deleteModal.execute('Non existing modal id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a modal', async () => {
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

    await deleteModal.execute(modal.id);

    expect(await draftModalsRepository.findById(modal.id)).toBe(undefined);
  });
});
