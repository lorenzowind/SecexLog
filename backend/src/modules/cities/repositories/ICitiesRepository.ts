import City from '../infra/typeorm/entities/City';

import ICreateCityDTO from '../dtos/ICreateOrUpdateCityDTO';

export default interface ICitiesRepository {
  findAllCities(search: string, page: number): Promise<City[]>;
  findById(id: string): Promise<City | undefined>;
  create(data: ICreateCityDTO): Promise<City>;
  save(city: City): Promise<City>;
  remove(city: City): Promise<void>;
}