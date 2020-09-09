import AppError from '@shared/errors/AppError';

import DraftModalsRepository from '@modules/modals/repositories/drafts/DraftModalsRepository';
import DraftProvidersRepository from '../repositories/drafts/DraftProvidersRepository';

import ListFilteredProvidersService from './ListFilteredProvidersService';

let draftModalsRepository: DraftModalsRepository;
let draftProvidersRepository: DraftProvidersRepository;

let listFilteredProviders: ListFilteredProvidersService;

describe('ListFilteredProviders', () => {
  beforeEach(() => {
    draftProvidersRepository = new DraftProvidersRepository();
    draftModalsRepository = new DraftModalsRepository();

    listFilteredProviders = new ListFilteredProvidersService(
      draftProvidersRepository,
      draftModalsRepository,
    );
  });

  it('should be able to list all the filtered providers', async () => {
    const firstModal = await draftModalsRepository.create({
      name: 'Modal 1',
      image: 'Modal image URL',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    const secondModal = await draftModalsRepository.create({
      name: 'Modal 2',
      image: 'Modal image URL 2',
      is_safe: true,
      is_cheap: true,
      is_fast: true,
    });

    await draftProvidersRepository.create({
      name: 'Provider Name',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 2',
      modal_id: firstModal.id,
      preference: 'CPF',
      preference_data: 'Preference data 2',
    });

    await draftProvidersRepository.create({
      name: 'Provider Name 3',
      modal_id: secondModal.id,
      preference: 'CPF',
      preference_data: 'Preference data 3',
    });

    const response = await listFilteredProviders.execute(firstModal.id);

    expect(response).toHaveLength(2);
  });

  it('should not be able to list filtered provider with non existing modal id', async () => {
    await expect(
      listFilteredProviders.execute('non existing modal id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
