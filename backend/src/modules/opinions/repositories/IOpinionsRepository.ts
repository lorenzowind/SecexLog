import Opinion from '../infra/typeorm/entities/Opinion';
import ICreateOpinionsDTO from '../dtos/ICreateOrUpdateOpinionsDTO';

export default interface IOpinionsRepository {
  findAllOpinions(search: string, page: number): Promise<Opinion[]>;
  findByTitle(name: string): Promise<Opinion | undefined>;
  findById(id: string): Promise<Opinion | undefined>;
  create(data: ICreateOpinionsDTO): Promise<Opinion>;
  save(opinion: Opinion): Promise<Opinion>;
  remove(opinion: Opinion): Promise<void>;
}
