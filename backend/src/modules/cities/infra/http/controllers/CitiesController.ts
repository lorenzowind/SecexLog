import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPaginationCitiesService from '@modules/cities/services/ListPaginationCitiesService';
import ListCitiesService from '@modules/cities/services/ListCitiesService';
import ListRelatedCitiesService from '@modules/cities/services/ListRelatedCitiesService';
import CreateCityService from '@modules/cities/services/CreateCityService';
import UpdateCityService from '@modules/cities/services/UpdateCityService';
import DeleteCityService from '@modules/cities/services/DeleteCityService';

export default class CitiesController {
  public async pagination(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const { search = '', page = 1 } = request.query;

    const listCities = container.resolve(ListPaginationCitiesService);

    const cities = await listCities.execute(
      String(search),
      Number(page),
      user_id,
    );

    return response.json(cities);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listCities = container.resolve(ListCitiesService);

    const cities = await listCities.execute(user_id);

    return response.json(cities);
  }

  public async related(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { city_id } = request.params;

    const listRelatedCities = container.resolve(ListRelatedCitiesService);

    const relatedCities = await listRelatedCities.execute(city_id);

    return response.json(relatedCities);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      is_base,
      is_auditated,
      related_cities,
      latitude,
      longitude,
      initial_flood_date,
      end_flood_date,
      interdiction_observation,
      city_observation,
    } = request.body;

    const createCity = container.resolve(CreateCityService);

    const city = await createCity.execute({
      name,
      is_base,
      is_auditated,
      related_cities,
      latitude,
      longitude,
      initial_flood_date,
      end_flood_date,
      interdiction_observation,
      city_observation,
    });

    return response.json(city);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      is_base,
      is_auditated,
      related_cities,
      latitude,
      longitude,
      initial_flood_date,
      end_flood_date,
      interdiction_observation,
      city_observation,
    } = request.body;

    const updateCity = container.resolve(UpdateCityService);

    const city = await updateCity.execute({
      id,
      name,
      is_base,
      is_auditated,
      related_cities,
      latitude,
      longitude,
      initial_flood_date,
      end_flood_date,
      interdiction_observation,
      city_observation,
    });

    return response.json(city);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCity = container.resolve(DeleteCityService);

    await deleteCity.execute(id);

    return response.status(200).send();
  }
}
