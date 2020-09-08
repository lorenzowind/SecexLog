import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IRelatedCitiesRepository from '@modules/cities/repositories/IRelatedCitiesRepository';

import RelatedCity from '@modules/cities/infra/typeorm/entities/RelatedCity';

class RelatedCitiesRepository implements IRelatedCitiesRepository {
  private ormRepository: Repository<RelatedCity>;

  constructor() {
    this.ormRepository = getRepository(RelatedCity);
  }

  public async findAllByCityId(city_id: string): Promise<RelatedCity[]> {
    const relatedCities = this.ormRepository.find({
      where: { city_id },
    });

    return relatedCities;
  }

  public async removeAllByCityId(city_id: string): Promise<void> {
    const relatedCities = await this.findAllByCityId(city_id);

    relatedCities.map(async relatedCity => {
      await this.ormRepository.remove(relatedCity);
    });
  }

  public async create(
    city_id: string,
    related_city_id: string,
  ): Promise<RelatedCity> {
    const relatedCity = this.ormRepository.create({
      city_id,
      related_city_id,
    });

    Object.assign(relatedCity, { id: v4() });

    await this.ormRepository.save(relatedCity);

    return relatedCity;
  }
}

export default RelatedCitiesRepository;
