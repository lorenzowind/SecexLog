import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPathsService from '@modules/paths/services/ListPathsService';
import ListFilteredPathsService from '@modules/paths/services/ListFilteredPathsService';
import CreatePathService from '@modules/paths/services/CreatePathService';
import UpdatePathService from '@modules/paths/services/UpdatePathService';
import DeletePathService from '@modules/paths/services/DeletePathService';

export default class PathsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { page = 1 } = request.query;

    const listPaths = container.resolve(ListPathsService);

    const paths = await listPaths.execute(Number(page), user_id);

    return response.json(paths);
  }

  public async origin(request: Request, response: Response): Promise<Response> {
    const { origin_city_name = '', page = 1 } = request.query;

    const listPaths = container.resolve(ListFilteredPathsService);

    const paths = await listPaths.execute(
      String(origin_city_name),
      Number(page),
      'origin_city',
    );

    return response.json(paths);
  }

  public async destination(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { destination_city_name = '', page = 1 } = request.query;

    const listPaths = container.resolve(ListFilteredPathsService);

    const paths = await listPaths.execute(
      String(destination_city_name),
      Number(page),
      'destination_city',
    );

    return response.json(paths);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      origin_city_id,
      destination_city_id,
      modal_id,
      provider_id,
      boarding_days,
      boarding_times,
      duration,
      mileage,
      cost,
      boarding_place,
      departure_place,
      is_hired,
    } = request.body;

    const createPath = container.resolve(CreatePathService);

    const path = await createPath.execute({
      origin_city_id,
      destination_city_id,
      modal_id,
      provider_id,
      boarding_days,
      boarding_times,
      duration,
      mileage,
      cost,
      boarding_place,
      departure_place,
      is_hired,
    });

    return response.json(path);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      origin_city_id,
      destination_city_id,
      modal_id,
      provider_id,
      boarding_days,
      boarding_times,
      duration,
      mileage,
      cost,
      boarding_place,
      departure_place,
      is_hired,
    } = request.body;

    const updatePath = container.resolve(UpdatePathService);

    const path = await updatePath.execute({
      id,
      origin_city_id,
      destination_city_id,
      modal_id,
      provider_id,
      boarding_days,
      boarding_times,
      duration,
      mileage,
      cost,
      boarding_place,
      departure_place,
      is_hired,
    });

    return response.json(path);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePath = container.resolve(DeletePathService);

    await deletePath.execute(id);

    return response.status(200).send();
  }
}
