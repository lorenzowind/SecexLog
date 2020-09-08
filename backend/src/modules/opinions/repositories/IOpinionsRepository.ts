import Opinion from '../infra/typeorm/entities/Opinion';

import ICreateOpinionDTO from '../dtos/ICreateOrUpdateOpinionDTO';

export default interface IOpinionsRepository {
  findAllOpinions(search: string, page: number): Promise<Opinion[]>;
  findByTitle(name: string): Promise<Opinion | undefined>;
  findById(id: string): Promise<Opinion | undefined>;
  create(data: ICreateOpinionDTO): Promise<Opinion>;
  remove(opinion: Opinion): Promise<void>;
}
