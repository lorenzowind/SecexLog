import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import ICreateCityDTO from '@modules/cities/dtos/ICreateOrUpdateCityDTO';

import City from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async findAllCities(search: string): Promise<City[]> {
    const cities =
      search !== ''
        ? await this.ormRepository.find({
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find();

    return cities;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const findCity = await this.ormRepository.findOne({
      where: { name },
    });

    return findCity;
  }

  public async findById(id: string): Promise<City | undefined> {
    const findCity = await this.ormRepository.findOne(id);

    return findCity;
  }

  public async create(cityData: ICreateCityDTO): Promise<City> {
    const city = this.ormRepository.create(cityData);

    Object.assign(city, { id: v4() });

    await this.ormRepository.save(city);

    return city;
  }

  public async save(city: City): Promise<City> {
    return this.ormRepository.save(city);
  }

  public async remove(city: City): Promise<void> {
    await this.ormRepository.remove(city);
  }
}

export default CitiesRepository;
