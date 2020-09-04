import City from '../infra/typeorm/entities/Holiday';
import ICreateCityDTO from '../dtos/ICreateOrUpdateHolidaysDTO';

export default interface IHolidaysRepository {
  findAllHolidays(search: string, page: number): Promise<City[]>;
  findByName(name: string): Promise<City | undefined>;
  findById(id: string): Promise<City | undefined>;
  create(data: ICreateCityDTO): Promise<City>;
  save(city: City): Promise<City>;
  remove(city: City): Promise<void>;
}
