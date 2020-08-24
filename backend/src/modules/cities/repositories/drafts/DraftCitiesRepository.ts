import { v4 } from 'uuid';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import ICreateCityDTO from '@modules/cities/dtos/ICreateOrUpdateCityDTO';

import City from '@modules/cities/infra/typeorm/entities/City';

export default class DraftCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  public async findAllCities(search: string, page: number): Promise<City[]> {
    const cities = search
      ? this.cities.filter(findUser => findUser.name.includes(search))
      : this.cities;

    return cities.slice((page - 1) * 10, page * 10);
  }

  public async findById(id: string): Promise<City | undefined> {
    const user = this.cities.find(findUser => findUser.id === id);

    return user;
  }

  public async create(cityData: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, { id: v4() }, cityData);

    this.cities.push(city);

    return city;
  }

  public async save(city: City): Promise<City> {
    const findIndex = this.cities.findIndex(
      findCity => findCity.id === city.id,
    );

    this.cities[findIndex] = city;

    return city;
  }

  public async remove(city: City): Promise<void> {
    const findIndex = this.cities.findIndex(
      findcity => findcity.id === city.id,
    );

    this.cities.splice(findIndex, 1);
  }
}
