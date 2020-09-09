import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import IProvidersRepository from '../repositories/IProvidersRepository';

import Provider from '../infra/typeorm/entities/Provider';

@injectable()
class ListFilteredProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,
  ) {}

  public async execute(modal_id: string): Promise<Provider[]> {
    const modal = await this.modalsRepository.findById(modal_id);

    if (!modal) {
      throw new AppError('Modal not found.');
    }

    const filteredProviders = await this.providersRepository.findAllByModalId(
      modal_id,
    );

    return filteredProviders;
  }
}

export default ListFilteredProvidersService;
