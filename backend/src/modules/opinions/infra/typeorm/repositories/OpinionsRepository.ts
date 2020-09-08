import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IOpinionsRepository from '@modules/opinions/repositories/IOpinionsRepository';
import ICreateOpinionsDTO from '@modules/opinions/dtos/ICreateOrUpdateOpinionsDTO';


import Opinion from '../entities/Opinion';

class OpinionsRepository implements IOpinionsRepository {
  private ormRepository: Repository<Opinion>;

  constructor() {
    this.ormRepository = getRepository(Opinion);
  }

  public async findAllOpinions(
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

  public async findByTitle(title: string): Promise<Opinion | undefined> {
    const findOpinion = await this.ormRepository.findOne(title);
    return findOpinion;
  }

  public async findById(id: string): Promise<Opinion | undefined> {
    const findOpinion = await this.ormRepository.findOne(id);

    return findOpinion;
  }

  public async create(data: ICreateOpinionsDTO): Promise<Opinion> {
    const opinion = this.ormRepository.create(data);
    Object.assign(opinion, { id: v4() });
    await this.ormRepository.save(opinion);
    return opinion;
  }

  public async save(opinion: Opinion): Promise<Opinion> {
    return this.ormRepository.save(opinion);
  }

  public async remove(opinion: Opinion): Promise<void> {
    await this.ormRepository.remove(opinion);
  }
}

export default OpinionsRepository;
