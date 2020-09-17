import { v4 } from 'uuid';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import ICreateProviderDTO from '@modules/providers/dtos/ICreateOrUpdateProviderDTO';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';

export default class DraftProvidersRepository implements IProvidersRepository {
  private providers: Provider[] = [];

  public async findAllProviders(search: string): Promise<Provider[]> {
    const providers = search
      ? this.providers.filter(findProvider =>
          findProvider.name.includes(search),
        )
      : this.providers;

    return providers;
  }

  public async findAllByModalId(modal_id: string): Promise<Provider[]> {
    const filteredProviders = this.providers.filter(
      findProvider => findProvider.modal_id === modal_id,
    );

    return filteredProviders;
  }

  public async findByName(name: string): Promise<Provider | undefined> {
    const provider = this.providers.find(
      findProvider => findProvider.name === name,
    );

    return provider;
  }

  public async findByEmail(email: string): Promise<Provider | undefined> {
    const provider = this.providers.find(
      findProvider => findProvider.email === email,
    );

    return provider;
  }

  public async findByPreferenceData(
    preference_data: string,
  ): Promise<Provider | undefined> {
    const provider = this.providers.find(
      findProvider => findProvider.preference_data === preference_data,
    );

    return provider;
  }

  public async findByPhoneNumber(
    phone_number: string,
  ): Promise<Provider | undefined> {
    const provider = this.providers.find(
      findProvider => findProvider.phone_number === phone_number,
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
