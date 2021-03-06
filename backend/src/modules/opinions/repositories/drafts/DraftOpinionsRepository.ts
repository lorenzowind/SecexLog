import { v4 } from 'uuid';

import IOpinionsRepository from '@modules/opinions/repositories/IOpinionsRepository';

import ICreateOpinionDTO from '@modules/opinions/dtos/ICreateOrUpdateOpinionDTO';

import Opinion from '@modules/opinions/infra/typeorm/entities/Opinion';

export default class DraftOpinionsRepository implements IOpinionsRepository {
  private opinions: Opinion[] = [];

  public async findAllOpinions(): Promise<Opinion[]> {
    return this.opinions;
  }

  public async findByTitle(title: string): Promise<Opinion | undefined> {
    const opinion = this.opinions.find(
      findOpinions => findOpinions.title === title,
    );

    return opinion;
  }

  public async findById(id: string): Promise<Opinion | undefined> {
    const opinion = this.opinions.find(findOpinion => findOpinion.id === id);

    return opinion;
  }

  public async create(opinionData: ICreateOpinionDTO): Promise<Opinion> {
    const opinion = new Opinion();

    Object.assign(opinion, { id: v4() }, opinionData);

    this.opinions.push(opinion);

    return opinion;
  }

  public async remove(opinion: Opinion): Promise<void> {
    const findIndex = this.opinions.findIndex(
      findOpinion => findOpinion.id === opinion.id,
    );

    this.opinions.splice(findIndex, 1);
  }
}
