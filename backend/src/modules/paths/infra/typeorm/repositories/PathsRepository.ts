import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IPathsRepository from '@modules/paths/repositories/IPathsRepository';

import ICreatePathDTO from '@modules/paths/dtos/ICreateOrUpdatePathDTO';

import Path from '../entities/Path';

class PathsRepository implements IPathsRepository {
  private ormRepository: Repository<Path>;

  constructor() {
    this.ormRepository = getRepository(Path);
  }

  public async findAllPaginationPaths(page: number): Promise<Path[]> {
    const paths = await this.ormRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });

    return paths;
  }

  public async findAllPaths(): Promise<Path[]> {
    return this.ormRepository.find();
  }

  public async findAllByOriginCity(
    origin_city_id: string,
    page: number,
  ): Promise<Path[]> {
    const paths = await this.ormRepository.find({
      where: { origin_city_id },
      skip: (page - 1) * 10,
      take: 10,
    });

    return paths;
  }

  public async findAllByDestinationCity(
    destination_city_id: string,
    page: number,
  ): Promise<Path[]> {
    const paths = await this.ormRepository.find({
      where: { destination_city_id },
      skip: (page - 1) * 10,
      take: 10,
    });

    return paths;
  }

  public async findById(id: string): Promise<Path | undefined> {
    const findPath = await this.ormRepository.findOne(id);

    return findPath;
  }

  public async create(pathData: ICreatePathDTO): Promise<Path> {
    const path = this.ormRepository.create(pathData);

    Object.assign(path, { id: v4() });

    await this.ormRepository.save(path);

    return path;
  }

  public async save(path: Path): Promise<Path> {
    return this.ormRepository.save(path);
  }

  public async remove(path: Path): Promise<void> {
    await this.ormRepository.remove(path);
  }
}

export default PathsRepository;
