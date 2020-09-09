import { v4 } from 'uuid';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import ICreateProviderDTO from '@modules/providers/dtos/ICreateOrUpdateProviderDTO';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';

export default class DraftProvidersRepository implements IProvidersRepository {
  private providers: Provider[] = [];

  public async findAllProviders(
    search: string,
    page: number,
  ): Promise<Provider[]> {
    const providers = search
      ? this.providers.filter(findProvider =>
          findProvider.name.includes(search),
        )
      : this.providers;

    return providers.slice((page - 1) * 10, page * 10);
  }

  public async findByName(name: string): Promise<Provider | undefined> {
    const provider = this.providers.find(
      findProvider => findProvider.name === name,
    );

    return provider;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = this.providers.find(
      findProvider => findProvider.id === id,
    );

    return provider;
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = new Provider();

    Object.assign(provider, { id: v4() }, providerData);

    this.providers.push(provider);

    return provider;
  }

  public async save(provider: Provider): Promise<Provider> {
    const findIndex = this.providers.findIndex(
      findProvider => findProvider.id === provider.id,
    );

    this.providers[findIndex] = provider;

    return provider;
  }

  public async remove(provider: Provider): Promise<void> {
    const findIndex = this.providers.findIndex(
      findProvider => findProvider.id === provider.id,
    );
    this.providers.splice(findIndex, 1);
  }
}
