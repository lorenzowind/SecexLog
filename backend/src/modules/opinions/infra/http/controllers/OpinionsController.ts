import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOpinionsService from '@modules/opinions/services/ListOpinionsService';
import CreateOpinionService from '@modules/opinions/services/CreateOpinionService';
import DeleteOpinionService from '@modules/opinions/services/DeleteOpinionService';

export default class OpinionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listOpinions = container.resolve(ListOpinionsService);

    const opinions = await listOpinions.execute(user_id);

    return response.json(opinions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const createOpinion = container.resolve(CreateOpinionService);

    const opinion = await createOpinion.execute({
      title,
      description,
    });

    return response.json(opinion);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOpinion = container.resolve(DeleteOpinionService);

    await deleteOpinion.execute(id);

    return response.status(200).send();
  }
}
