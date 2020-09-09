import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/providers/services/ListProvidersService';
import ListFilteredProvidersService from '@modules/providers/services/ListFilteredProvidersService';
import CreateProviderService from '@modules/providers/services/CreateProviderService';
import UpdateProviderService from '@modules/providers/services/UpdateProviderService';
import DeleteProviderService from '@modules/providers/services/DeleteProviderService';

export default class ProvidersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { search = '', page = 1 } = request.query;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute(
      String(search),
      Number(page),
      user_id,
    );

    return response.json(providers);
  }

  public async filter(request: Request, response: Response): Promise<Response> {
    const { modal_id } = request.params;

    const listFilteredProviders = container.resolve(
      ListFilteredProvidersService,
    );

    const filteredProviders = await listFilteredProviders.execute(modal_id);

    return response.json(filteredProviders);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      phone_number,
      email,
      modal_id,
      preference,
      preference_data,
    } = request.body;

    const createProvider = container.resolve(CreateProviderService);

    const provider = await createProvider.execute({
      name,
      phone_number,
      email,
      modal_id,
      preference,
      preference_data,
    });

    return response.json(provider);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      phone_number,
      email,
      modal_id,
      preference,
      preference_data,
    } = request.body;

    const updateProvider = container.resolve(UpdateProviderService);

    const provider = await updateProvider.execute({
      name,
      phone_number,
      email,
      modal_id,
      preference,
      preference_data,
    });

    return response.json(provider);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProvider = container.resolve(DeleteProviderService);

    await deleteProvider.execute(id);

    return response.status(200).send();
  }
}
