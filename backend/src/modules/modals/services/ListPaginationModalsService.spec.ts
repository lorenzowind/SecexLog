import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftModalsRepository from '../repositories/drafts/DraftModalsRepository';

import ListPaginationModalsService from './ListPaginationModalsService';

let draftModalsRepository: DraftModalsRepository;

let draftCacheProvider: DraftCacheProvider;

let listPaginationModals: ListPaginationModalsService;

describe('ListPaginationModal', () => {
  beforeEach(() => {
    draftModalsRepository = new DraftModalsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listPaginationModals = new ListPaginationModalsService(
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

    await expect(
      listPaginationModals.execute('', 1, null),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all the modals from the first page', async () => {
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

    const response = await listPaginationModals.execute('', 1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

    await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const response = await listPaginationModals.execute('', -1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list modals from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

    await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const response = await listPaginationModals.execute('', 2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same modals if the same request is made', async () => {
    const user_id = 'authenticated user id';

    await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await listPaginationModals.execute('', 1, user_id);

    const response = await listPaginationModals.execute('', 1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate modals from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

    await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await listPaginationModals.execute('', 1, user_id);

    const response = await listPaginationModals.execute('', 2, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the modals', async () => {
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

    await draftModalsRepository.create({
      name: 'Modal 3',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 4',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 5',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 6',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 7',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 8',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 9',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 10',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 11',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 12',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await listPaginationModals.execute('', 1, user_id);

    const response = await listPaginationModals.execute('', 2, user_id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the modals from the first page which includes a search string', async () => {
    const modalSearch = 'Modal Searching';

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

    await draftModalsRepository.create({
      name: 'Modal 3',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: modalSearch,
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 5',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftModalsRepository.create({
      name: 'Modal 6',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const response = await listPaginationModals.execute(
      modalSearch,
      1,
      user_id,
    );

    expect(response).toHaveLength(1);
  });
});
