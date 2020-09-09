import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import ICreateProviderDTO from '@modules/providers/dtos/ICreateOrUpdateProviderDTO';

import Provider from '../entities/Provider';

class ProvidersRepository implements IProvidersRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findAllProviders(
    search: string,
    page: number,
  ): Promise<Provider[]> {
    const providers =
      search !== ''
        ? await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
          });

    return providers;
  }

  public async findByName(name: string): Promise<Provider | undefined> {
    const findProvider = await this.ormRepository.findOne(name);

    return findProvider;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const findProvider = await this.ormRepository.findOne(id);

    return findProvider;
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create(providerData);

    Object.assign(provider, { id: v4() });

    await this.ormRepository.save(provider);

    return provider;
  }

  public async save(provider: Provider): Promise<Provider> {
    return this.ormRepository.save(provider);
  }

  public async remove(provider: Provider): Promise<void> {
    await this.ormRepository.remove(provider);
  }
}

export default ProvidersRepository;
