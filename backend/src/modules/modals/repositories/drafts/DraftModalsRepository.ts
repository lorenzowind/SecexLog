import { v4 } from 'uuid';

import IModalsRepository from '@modules/modals/repositories/IModalsRepository';

import ICreateModalDTO from '@modules/modals/dtos/ICreateOrUpdateModalDTO';

import Modal from '@modules/modals/infra/typeorm/entities/Modal';

export default class DraftModalsRepository implements IModalsRepository {
  private modals: Modal[] = [];

  public async findAllPaginationModals(
    search: string,
    page: number,
  ): Promise<Modal[]> {
    const modals = search
      ? this.modals.filter(findModal => findModal.name.includes(search))
      : this.modals;

    return modals.slice((page - 1) * 10, page * 10);
  }

  public async findAllModals(): Promise<Modal[]> {
    return this.modals;
  }

  public async findByName(name: string): Promise<Modal | undefined> {
    const modal = this.modals.find(findModal => findModal.name === name);

    return modal;
  }

  public async findById(id: string): Promise<Modal | undefined> {
    const modal = this.modals.find(findModal => findModal.id === id);

    return modal;
  }

  public async create(modalData: ICreateModalDTO): Promise<Modal> {
    const modal = new Modal();

    Object.assign(modal, { id: v4() }, modalData);

    this.modals.push(modal);

    return modal;
  }

  public async save(modal: Modal): Promise<Modal> {
    const findIndex = this.modals.findIndex(
      findModal => findModal.id === modal.id,
    );

    this.modals[findIndex] = modal;

    return modal;
  }

  public async remove(modal: Modal): Promise<void> {
    const findIndex = this.modals.findIndex(
      findModal => findModal.id === modal.id,
    );

    this.modals.splice(findIndex, 1);
  }
}
