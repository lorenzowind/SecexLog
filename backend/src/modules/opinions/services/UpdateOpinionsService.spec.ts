import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftOpinionsRepository from '../repositories/drafts/DraftOpinionsRepository';

import UpdateOpinionsService from './UpdateOpinionsService';

let draftOpinionsRepository: DraftOpinionsRepository;

let draftCacheProvider: DraftCacheProvider;

let updateOpinions: UpdateOpinionsService;

describe('UpdateOpinion', () => {
  beforeEach(() => {
    draftOpinionsRepository = new DraftOpinionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateOpinions = new UpdateOpinionsService(
      draftOpinionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the opinion', async () => {
    const opinion = await draftOpinionsRepository.create({
      title: 'Title 1',
      description: 'description 1'
    });

    const updatedOpinion = await updateOpinions.execute({
      id: opinion.id,
      title: 'New Title 1',
      description: 'new description 1'
    });

    expect(updatedOpinion.title).toBe('New Title 1');
    expect(updatedOpinion.description).toBe('new description 1');

  });

  it('should not be able to update from a non existing opinion', async () => {
    expect(
      updateOpinions.execute({
        id: 'non existing opinion',
        title: 'New Opinion 1',
        description: 'description',
        
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another opinion title', async () => {
    await draftOpinionsRepository.create({
      title: 'title 1',
      description: 'new opinion 01'
    });

    const opinion = await draftOpinionsRepository.create({
      title: 'title 2',
      description: 'new description 02'
    });


    await expect(
      updateOpinions.execute({
        id: opinion.id,
        title: 'title 2',
        description: ''
      }),
    ).rejects.toBeInstanceOf(AppError);
    
  });
});
