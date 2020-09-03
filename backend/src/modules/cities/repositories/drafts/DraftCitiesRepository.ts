import { v4 } from 'uuid';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import ICreateCityDTO from '@modules/cities/dtos/ICreateOrUpdateCityDTO';

import City from '@modules/cities/infra/typeorm/entities/City';

export default class DraftCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  public async findAllCities(search: string, page: number): Promise<City[]> {
    const cities = search
      ? this.cities.filter(findCity => findCity.name.includes(search))
      : this.cities;

    return cities.slice((page - 1) * 10, page * 10);
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = this.cities.find(findCity => findCity.name === name);

    return city;
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = this.cities.find(findCity => findCity.id === id);

    return city;
  }

  public async checkRelatedCities(related_cities: string): Promise<boolean> {
    const citiesNames = related_cities.split(', ');

    let checkValidCities = true;

    citiesNames.map(cityName => {
      if (!this.cities.find(city => city.name === cityName)) {
        checkValidCities = false;
      }
    });

    return checkValidCities;
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
