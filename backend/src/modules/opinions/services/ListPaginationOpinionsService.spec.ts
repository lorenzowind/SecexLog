import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftOpinionsRepository from '../repositories/drafts/DraftOpinionsRepository';

import ListPaginationOpinionsService from './ListPaginationOpinionsService';

let draftOpinionsRepository: DraftOpinionsRepository;

let draftCacheProvider: DraftCacheProvider;

let listPaginationOpinions: ListPaginationOpinionsService;

describe('ListPaginationOpinions', () => {
  beforeEach(() => {
    draftOpinionsRepository = new DraftOpinionsRepository();
    draftCacheProvider = new DraftCacheProvider();

    listPaginationOpinions = new ListPaginationOpinionsService(
      draftOpinionsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to list opinions without authentication', async () => {
    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 2',
      description: 'Opinion description 2',
    });

    await expect(
      listPaginationOpinions.execute('', 1, null),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all the opinions from the first page', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 2',
      description: 'Opinion description 2',
    });

    const response = await listPaginationOpinions.execute('', 1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    const response = await listPaginationOpinions.execute('', -1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list opinions from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    const response = await listPaginationOpinions.execute('', 2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same opinions if the same request is made', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await listPaginationOpinions.execute('', 1, user_id);

    const response = await listPaginationOpinions.execute('', 1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate opinions from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await listPaginationOpinions.execute('', 1, user_id);

    const response = await listPaginationOpinions.execute('', 2, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the opinions', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 2',
      description: 'Opinion description 2',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 3',
      description: 'Opinion description 3',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 4',
      description: 'Opinion description 4',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 5',
      description: 'Opinion description 5',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 6',
      description: 'Opinion description 6',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 7',
      description: 'Opinion description 7',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 8',
      description: 'Opinion description 8',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 9',
      description: 'Opinion description 9',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 10',
      description: 'Opinion description 10',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 11',
      description: 'Opinion description 11',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 12',
      description: 'Opinion description 12',
    });

    await listPaginationOpinions.execute('', 1, user_id);

    const response = await listPaginationOpinions.execute('', 2, user_id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the opinions from the first page which includes a search string', async () => {
    const opinionSearch = 'Opinion Searching';

    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 2',
      description: 'Opinion description 2',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 3',
      description: 'Opinion description 3',
    });

    await draftOpinionsRepository.create({
      title: opinionSearch,
      description: 'Opinion description 4',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 5',
      description: 'Opinion description 5',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 6',
      description: 'Opinion description 6',
    });

    const response = await listPaginationOpinions.execute(
      opinionSearch,
      1,
      user_id,
    );

    expect(response).toHaveLength(1);
  });
});
