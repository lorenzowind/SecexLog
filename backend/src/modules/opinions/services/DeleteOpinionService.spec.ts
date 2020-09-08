import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftOpinionsRepository from '../repositories/drafts/DraftOpinionsRepository';

import DeleteOpinionsService from './DeleteOpinionService';

let draftOpinionsRepository: DraftOpinionsRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteOpinion: DeleteOpinionsService;

describe('DeleteOpinion', () => {
  beforeEach(() => {
    draftOpinionsRepository = new DraftOpinionsRepository();
    draftCacheProvider = new DraftCacheProvider();

    deleteOpinion = new DeleteOpinionsService(
      draftOpinionsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing opinion', async () => {
    await expect(
      deleteOpinion.execute('Non existing opinion id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a opinion', async () => {
    await draftOpinionsRepository.create({
      title: 'Opinion title 2',
      description: 'Opinion description 2',
    });

    const opinion = await draftOpinionsRepository.create({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    await deleteOpinion.execute(opinion.id);

    expect(await draftOpinionsRepository.findById(opinion.id)).toBe(undefined);
  });
});
