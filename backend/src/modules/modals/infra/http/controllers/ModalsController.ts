import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListModalsService from '@modules/modals/services/ListModalsService';
import CreateModalService from '@modules/modals/services/CreateModalService';
import UpdateModalService from '@modules/modals/services/UpdateModalService';
import DeleteModalService from '@modules/modals/services/DeleteModalService';

export default class ModalsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { search = '', page = 1 } = request.query;

    const listModals = container.resolve(ListModalsService);

    const modals = await listModals.execute(
      String(search),
      Number(page),
      user_id,
    );

    return response.json(modals);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, image, is_safe, is_cheap, is_fast } = request.body;

    const createModal = container.resolve(CreateModalService);

    const modal = await createModal.execute({
      name,
      image,
      is_safe,
      is_cheap,
      is_fast,
    });

    return response.json(modal);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, image, is_safe, is_cheap, is_fast } = request.body;

    const updateModal = container.resolve(UpdateModalService);

    const modal = await updateModal.execute({
      id,
      name,
      image,
      is_safe,
      is_cheap,
      is_fast,
    });

    return response.json(modal);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteModal = container.resolve(DeleteModalService);

    await deleteModal.execute(id);

    return response.status(200).send();
  }
}
