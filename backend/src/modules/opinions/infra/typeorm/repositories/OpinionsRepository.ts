import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IOpinionsRepository from '@modules/opinions/repositories/IOpinionsRepository';

import ICreateOpinionDTO from '@modules/opinions/dtos/ICreateOrUpdateOpinionDTO';

import Opinion from '../entities/Opinion';

class OpinionsRepository implements IOpinionsRepository {
  private ormRepository: Repository<Opinion>;

  constructor() {
    this.ormRepository = getRepository(Opinion);
  }

  public async findAllPaginationOpinions(
    search: string,
    page: number,
  ): Promise<Opinion[]> {
    const opinions =
      search !== ''
        ? await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
          });

    return opinions;
  }

  public async findAllOpinions(): Promise<Opinion[]> {
    return this.ormRepository.find();
  }

  public async findByTitle(title: string): Promise<Opinion | undefined> {
    const findOpinion = await this.ormRepository.findOne(title);

    return findOpinion;
  }

  public async findById(id: string): Promise<Opinion | undefined> {
    const findOpinion = await this.ormRepository.findOne(id);

    return findOpinion;
  }

  public async create(data: ICreateOpinionDTO): Promise<Opinion> {
    const opinion = this.ormRepository.create(data);

    Object.assign(opinion, { id: v4() });

    await this.ormRepository.save(opinion);

    return opinion;
  }

  public async remove(opinion: Opinion): Promise<void> {
    await this.ormRepository.remove(opinion);
  }
}

export default OpinionsRepository;
