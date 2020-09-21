import Path from '../infra/typeorm/entities/Path';

import ICreatePathDTO from '../dtos/ICreateOrUpdatePathDTO';

export default interface IPathsRepository {
  findAllPaths(): Promise<Path[]>;
  findAllByOriginCity(origin_city_id: string): Promise<Path[]>;
  findAllByDestinationCity(destination_city_id: string): Promise<Path[]>;
  findAllByOriginAndDestinationCity(
    origin_city_id: string,
    destination_city_id: string,
  ): Promise<Path[]>;
  findById(id: string): Promise<Path | undefined>;
  create(data: ICreatePathDTO): Promise<Path>;
  save(path: Path): Promise<Path>;
  remove(path: Path): Promise<void>;
}
