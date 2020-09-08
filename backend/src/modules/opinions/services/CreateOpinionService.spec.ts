import AppError from '@shared/errors/AppError';

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
      title: 'Opinion 01',
      description: 'description of opinion 01',
      
    });

    expect(opinion).toHaveProperty('id');
  });

  it('should not be able to create a new opinion with the same name from another', async () => {
    await createOpinion.execute({
     title: 'Opinion 01',
     description:'description of teste.'
      
    });

    await expect(
      createOpinion.execute({
        title:'Opinion 01',
        description: 'description of opinion 01'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
