import { v4 } from 'uuid';

import IRelatedCitiesRepository from '@modules/cities/repositories/IRelatedCitiesRepository';

import RelatedCity from '@modules/cities/infra/typeorm/entities/RelatedCity';

export default class DraftRelatedCitiesRepository
  implements IRelatedCitiesRepository
{
  private relatedCities: RelatedCity[] = [];

  public async findAllByCityId(city_id: string): Promise<RelatedCity[]> {
    const relatedCities = this.relatedCities.filter(
      findRelatedCity => findRelatedCity.city_id === city_id,
    );

    return relatedCities;
  }

  public async removeAllByCityId(city_id: string): Promise<void> {
    const relatedCities = await this.findAllByCityId(city_id);

    relatedCities.map(relatedCity => {
      const findIndex = this.relatedCities.findIndex(
        relatedCity_ => relatedCity_.id === relatedCity.id,
      );

      this.relatedCities.splice(findIndex, 1);
    });
  }

  public async create(
    city_id: string,
    related_city_id: string,
  ): Promise<RelatedCity> {
    const relatedCity = new RelatedCity();

    Object.assign(relatedCity, { id: v4(), city_id, related_city_id });

    this.relatedCities.push(relatedCity);

    return relatedCity;
  }
}
