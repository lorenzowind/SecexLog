import { v4 } from 'uuid';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import ICreateCityDTO from '@modules/cities/dtos/ICreateOrUpdateCityDTO';

import City from '@modules/cities/infra/typeorm/entities/City';

export default class DraftCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  public async findAllCities(search: string): Promise<City[]> {
    const cities = search
      ? this.cities.filter(findCity => findCity.name.includes(search))
      : this.cities;

    return cities;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = this.cities.find(findCity => findCity.name === name);

    return city;
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = this.cities.find(findCity => findCity.id === id);

    return city;
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
      findCity => findCity.id === city.id,
    );

    this.cities.splice(findIndex, 1);
  }
}
