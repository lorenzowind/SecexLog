import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import IProvidersRepository from '../repositories/IProvidersRepository';

import ICreateProviderDTO from '../dtos/ICreateOrUpdateProviderDTO';

import Provider from '../infra/typeorm/entities/Provider';

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    phone_number,
    email,
    modal_id,
    preference,
    preference_data,
  }: ICreateProviderDTO): Promise<Provider> {
    const checkProviderNameExists = await this.providersRepository.findByName(
      name,
    );

    if (checkProviderNameExists) {
      throw new AppError('Provider name already used.');
    }

    if (email) {
      const checkProviderEmailExists = await this.providersRepository.findByEmail(
        email,
      );

      if (checkProviderEmailExists) {
        throw new AppError('Provider email already used.');
      }
    }

    if (phone_number) {
      const checkProviderPhoneNumberExists = await this.providersRepository.findByPhoneNumber(
        phone_number,
      );

      if (checkProviderPhoneNumberExists) {
        throw new AppError('Provider phone number already used.');
      }
    }

    const checkProviderPreferenceDataExists = await this.providersRepository.findByPreferenceData(
      preference_data,
    );

    if (checkProviderPreferenceDataExists) {
      throw new AppError('Provider preference data already used.');
    }

    const checkModalExists = await this.modalsRepository.findById(modal_id);

    if (!checkModalExists) {
      throw new AppError('Informed modal does not exists.');
    }

    const provider = await this.providersRepository.create({
      name,
      phone_number,
      email,
      modal_id,
      preference,
      preference_data,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return provider;
  }
}

export default CreateProviderService;
