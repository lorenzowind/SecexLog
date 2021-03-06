import { v4 } from 'uuid';

import IPathsRepository from '@modules/paths/repositories/IPathsRepository';

import ICreatePathDTO from '@modules/paths/dtos/ICreateOrUpdatePathDTO';

import Path from '@modules/paths/infra/typeorm/entities/Path';

export default class DraftPathsRepository implements IPathsRepository {
  private paths: Path[] = [];

  public async findAllPaths(): Promise<Path[]> {
    return this.paths;
  }

  public async findAllByOriginCity(origin_city_id: string): Promise<Path[]> {
    const paths = this.paths.filter(findPath =>
      findPath.origin_city_id.includes(origin_city_id),
    );

    return paths;
  }

  public async findAllByDestinationCity(
    destination_city_id: string,
  ): Promise<Path[]> {
    const paths = this.paths.filter(findPath =>
      findPath.destination_city_id.includes(destination_city_id),
    );

    return paths;
  }

  public async findAllByOriginAndDestinationCity(
    origin_city_id: string,
    destination_city_id: string,
  ): Promise<Path[]> {
    const paths = this.paths.filter(
      findPath =>
        findPath.origin_city_id.includes(origin_city_id) &&
        findPath.destination_city_id.includes(destination_city_id),
    );

    return paths;
  }

  public async findById(id: string): Promise<Path | undefined> {
    const path = this.paths.find(findPath => findPath.id === id);

    return path;
  }

  public async create(pathData: ICreatePathDTO): Promise<Path> {
    const path = new Path();

    Object.assign(path, { id: v4() }, pathData);

    this.paths.push(path);

    return path;
  }

  public async save(path: Path): Promise<Path> {
    const findIndex = this.paths.findIndex(findPath => findPath.id === path.id);

    this.paths[findIndex] = path;

    return path;
  }

  public async remove(path: Path): Promise<void> {
    const findIndex = this.paths.findIndex(findPath => findPath.id === path.id);

    this.paths.splice(findIndex, 1);
  }
}
