import RelatedCity from '../infra/typeorm/entities/RelatedCity';

export default interface IRelatedCitiesRepository {
  findAllByCityId(city_id: string): Promise<RelatedCity[]>;
  removeAllByCityId(city_id: string): Promise<void>;
  create(city_id: string, related_city_id: string): Promise<RelatedCity>;
}
