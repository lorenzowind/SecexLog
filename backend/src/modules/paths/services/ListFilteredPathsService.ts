import { injectable, inject } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IPathsRepository from '../repositories/IPathsRepository';

import Path from '../infra/typeorm/entities/Path';

@injectable()
class ListFilteredPathsService {
  constructor(
    @inject('PathsRepository')
    private pathsRepository: IPathsRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(
    city_name: string,
    page: number,
    attribute: 'origin_city' | 'destination_city',
  ): Promise<Path[]> {
    let paths: Path[] = [];

    if (attribute === 'origin_city') {
      const checkOriginCityNameExists = await this.citiesRepository.findByName(
        city_name,
      );

      if (!checkOriginCityNameExists) {
        return [];
      }

      paths = await this.pathsRepository.findAllByOriginCity(
        checkOriginCityNameExists.id,
        page > 0 ? page : 1,
      );
    }

    if (attribute === 'destination_city') {
      const checkDestinationCityNameExists = await this.citiesRepository.findByName(
        city_name,
      );

      if (!checkDestinationCityNameExists) {
        return [];
      }

      paths = await this.pathsRepository.findAllByDestinationCity(
        checkDestinationCityNameExists.id,
        page > 0 ? page : 1,
      );
    }

    return paths;
  }
}

export default ListFilteredPathsService;
