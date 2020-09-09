import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IModalsRepository from '@modules/modals/repositories/IModalsRepository';

import ICreateModalDTO from '@modules/modals/dtos/ICreateOrUpdateModalDTO';

import Modal from '../entities/Modal';

class ModalsRepository implements IModalsRepository {
  private ormRepository: Repository<Modal>;

  constructor() {
    this.ormRepository = getRepository(Modal);
  }

  public async findAllModals(search: string, page: number): Promise<Modal[]> {
    const modals =
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

    return modals;
  }

  public async findByName(name: string): Promise<Modal | undefined> {
    const findModal = await this.ormRepository.findOne(name);

    return findModal;
  }

  public async findById(id: string): Promise<Modal | undefined> {
    const findModal = await this.ormRepository.findOne(id);

    return findModal;
  }

  public async create(modalData: ICreateModalDTO): Promise<Modal> {
    const modal = this.ormRepository.create(modalData);

    Object.assign(modal, { id: v4() });

    await this.ormRepository.save(modal);

    return modal;
  }

  public async save(modal: Modal): Promise<Modal> {
    return this.ormRepository.save(modal);
  }

  public async remove(modal: Modal): Promise<void> {
    await this.ormRepository.remove(modal);
  }
}

export default ModalsRepository;
