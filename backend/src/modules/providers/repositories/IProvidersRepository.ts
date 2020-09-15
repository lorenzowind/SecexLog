import Provider from '../infra/typeorm/entities/Provider';

import ICreateProviderDTO from '../dtos/ICreateOrUpdateProviderDTO';

export default interface IProvidersRepository {
  findAllPaginationProviders(search: string, page: number): Promise<Provider[]>;
  findAllProviders(): Promise<Provider[]>;
  findAllByModalId(modal_id: string): Promise<Provider[]>;
  findByName(name: string): Promise<Provider | undefined>;
  findByEmail(email: string): Promise<Provider | undefined>;
  findByPreferenceData(preference_data: string): Promise<Provider | undefined>;
  findByPhoneNumber(phone_number: string): Promise<Provider | undefined>;
  findById(id: string): Promise<Provider | undefined>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(provider: Provider): Promise<Provider>;
  remove(provider: Provider): Promise<void>;
}
