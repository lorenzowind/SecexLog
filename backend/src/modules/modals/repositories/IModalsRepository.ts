import Modal from '../infra/typeorm/entities/Modal';

import ICreateModalDTO from '../dtos/ICreateOrUpdateModalDTO';

export default interface IModalsRepository {
  findAllPaginationModals(search: string, page: number): Promise<Modal[]>;
  findAllModals(): Promise<Modal[]>;
  findByName(name: string): Promise<Modal | undefined>;
  findById(id: string): Promise<Modal | undefined>;
  create(data: ICreateModalDTO): Promise<Modal>;
  save(modal: Modal): Promise<Modal>;
  remove(modal: Modal): Promise<void>;
}
