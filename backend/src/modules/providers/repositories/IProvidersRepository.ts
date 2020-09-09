import Provider from '../infra/typeorm/entities/Provider';

import ICreateProviderDTO from '../dtos/ICreateOrUpdateProviderDTO';

export default interface IProvidersRepository {
  findAllProviders(search: string, page: number): Promise<Provider[]>;
  findByName(name: string): Promise<Provider | undefined>;
  findById(id: string): Promise<Provider | undefined>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(provider: Provider): Promise<Provider>;
  remove(provider: Provider): Promise<void>;
}
