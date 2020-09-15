import City from '../infra/typeorm/entities/City';

import ICreateCityDTO from '../dtos/ICreateOrUpdateCityDTO';

export default interface ICitiesRepository {
  findAllPaginationCities(search: string, page: number): Promise<City[]>;
  findAllCities(): Promise<City[]>;
  findByName(name: string): Promise<City | undefined>;
  findById(id: string): Promise<City | undefined>;
  create(data: ICreateCityDTO): Promise<City>;
  save(city: City): Promise<City>;
  remove(city: City): Promise<void>;
}
