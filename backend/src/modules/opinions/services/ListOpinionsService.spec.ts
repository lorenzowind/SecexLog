import AppError from '@shared/errors/AppError';

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

  it('should not be able to list opinions without authentication', async () => {
    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 2',
      description: 'Opinion description 2',
    });

    await expect(listOpinions.execute(null)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all the opinions', async () => {
    const user_id = 'authenticated user id';

    await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await draftOpinionsRepository.create({
      title: 'Opinion title 2',
      description: 'Opinion description 2',
    });

    await listOpinions.execute(user_id);

    const response = await listOpinions.execute(user_id);

    expect(response).toHaveLength(2);
  });
});
