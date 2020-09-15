import Path from '../infra/typeorm/entities/Path';

import ICreatePathDTO from '../dtos/ICreateOrUpdatePathDTO';

export default interface IPathsRepository {
  findAllPaginationPaths(page: number): Promise<Path[]>;
  findAllPaths(): Promise<Path[]>;
  findAllByOriginCity(origin_city_id: string, page: number): Promise<Path[]>;
  findAllByDestinationCity(
    destination_city_id: string,
    page: number,
  ): Promise<Path[]>;
  findById(id: string): Promise<Path | undefined>;
  create(data: ICreatePathDTO): Promise<Path>;
  save(path: Path): Promise<Path>;
  remove(path: Path): Promise<void>;
}
