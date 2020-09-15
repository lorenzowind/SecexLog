import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '../repositories/drafts/DraftModalsRepository';

import ListModalsService from './ListModalsService';

let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let listModals: ListModalsService;

describe('ListModal', () => {
  beforeEach(() => {
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listModals = new ListModalsService(
      draftModalsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to list opinions without authentication', async () => {
    await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 2',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await expect(listModals.execute(null)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all the modals', async () => {
    const user_id = 'authenticated user id';

    await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 2',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await listModals.execute(user_id);

    const response = await listModals.execute(user_id);

    expect(response).toHaveLength(2);
  });
});
