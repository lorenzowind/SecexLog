import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftOpinionsRepository from '../repositories/drafts/DraftOpinionsRepository';

import ListOpinionService from './ListOpinionsService';

let draftOpinionsRepository: DraftOpinionsRepository;

let draftCacheProvider: DraftCacheProvider;

let listOpinions: ListOpinionService;

describe('ListOpinions', () => {
  beforeEach(() => {
    draftOpinionsRepository = new DraftOpinionsRepository();
    draftCacheProvider = new DraftCacheProvider();

    listOpinions = new ListOpinionService(
      draftOpinionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the opinions from the first page without authentication', async () => {
    await draftOpinionsRepository.create({
      title: 'Opinion 1',
      description: 'description'
    });

    await draftOpinionsRepository.create({
      title: 'Opinion 2',
      description: 'description'
    });

    const response = await listOpinions.execute('', 1, null);

    expect(response).toHaveLength(2);
  });

  it('should be able to list all the opinions from the first page', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'opinion 1',
      description: 'description'
    });

    await draftOpinionsRepository.create({
      title: 'opinion 2',
      description: 'description'
    });

    const response = await listOpinions.execute('', 1, user_id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'opinion 1',
      description: 'description'
    });

    const response = await listOpinions.execute('', -1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list opinions from the second page without accumulate the first one', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'opinion 1',
      description: 'description'
    });

    const response = await listOpinions.execute('', 2, user_id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same opinions if the same request is made', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'opinion 1',
      description: 'description'
    });

    await listOpinions.execute('', 1, user_id);

    const response = await listOpinions.execute('', 1, user_id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate opinions from the first page on the second one', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'opinion 1',
      description: 'description'
    });

    await listOpinions.execute('', 1, user_id);

    const response = await listOpinions.execute('', 2, user_id);

    expect(response).toHaveLength(1);
  });
});
