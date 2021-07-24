import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import IProvidersRepository from '../repositories/IProvidersRepository';

import Provider from '../infra/typeorm/entities/Provider';

import IUpdateProviderDTO from '../dtos/ICreateOrUpdateProviderDTO';

interface IRequest extends IUpdateProviderDTO {
  id: string;
}

@injectable()
class UpdateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    phone_number,
    email,
    modal_id,
    preference,
    preference_data,
  }: IRequest): Promise<Provider> {
    const provider = await this.providersRepository.findById(id);

    if (!provider) {
      throw new AppError('Provider not found.');
    }
    const checkProviderNameExists = await this.providersRepository.findByName(
      name,
    );

    if (checkProviderNameExists && checkProviderNameExists.id !== id) {
      throw new AppError('Provider name already used.');
    }

    if (email) {
      const checkProviderEmailExists =
        await this.providersRepository.findByEmail(email);

      if (checkProviderEmailExists && checkProviderEmailExists.id !== id) {
        throw new AppError('Provider email already used.');
      }
    }

    if (phone_number) {
      const checkProviderPhoneNumberExists =
        await this.providersRepository.findByPhoneNumber(phone_number);

      if (
        checkProviderPhoneNumberExists &&
        checkProviderPhoneNumberExists.id !== id
      ) {
        throw new AppError('Provider phone number already used.');
      }
    }

    const checkProviderPreferenceDataExists =
      await this.providersRepository.findByPreferenceData(preference_data);

    if (
      checkProviderPreferenceDataExists &&
      checkProviderPreferenceDataExists.id !== id
    ) {
      throw new AppError('Provider preference data already used.');
    }

    const checkModalExists = await this.modalsRepository.findById(modal_id);

    if (!checkModalExists) {
      throw new AppError('Informed modal does not exists.');
    }

    provider.name = name;
    provider.modal_id = modal_id;
    provider.preference = preference;
    provider.preference_data = preference_data;

    if (phone_number) {
      provider.phone_number = phone_number;
    }

    if (email) {
      provider.email = email;
    }

    await this.cacheProvider.invalidatePrefix('providers-list');

    return this.providersRepository.save(provider);
  }
}

export default UpdateProviderService;
