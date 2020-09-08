import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftOpinionsRepository from '../repositories/drafts/DraftOpinionsRepository';

import CreateOpinionService from './CreateOpinionService';

let draftOpinionsRepository: DraftOpinionsRepository;

let draftCacheProvider: DraftCacheProvider;

let createOpinion: CreateOpinionService;

describe('CreateOpinion', () => {
  beforeEach(() => {
    draftOpinionsRepository = new DraftOpinionsRepository();
    draftCacheProvider = new DraftCacheProvider();

    createOpinion = new CreateOpinionService(
      draftOpinionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new opinion', async () => {
    const opinion = await createOpinion.execute({
      title: 'Opinion title',
      description: 'Opinion description',
    });

    expect(opinion).toHaveProperty('id');
  });
});
