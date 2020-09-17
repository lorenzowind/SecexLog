import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersService from '@modules/users/services/ListUsersService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { search = '' } = request.query;

    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute(String(search), user_id);

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, login, email, position, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      login,
      email,
      position,
      password,
    });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, login, email, position, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      login,
      email,
      position,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute(id);

    return response.status(200).send();
  }
}
