import City from '../infra/typeorm/entities/City';

import ICreateCityDTO from '../dtos/ICreateOrUpdateCityDTO';

export default interface ICitiesRepository {
  findAllCities(search: string, page: number): Promise<City[]>;
  findByName(name: string): Promise<City | undefined>;
  findById(id: string): Promise<City | undefined>;
  checkRelatedCities(related_cities: string): Promise<boolean>;
  create(data: ICreateCityDTO): Promise<City>;
  save(city: City): Promise<City>;
  remove(city: City): Promise<void>;
}
