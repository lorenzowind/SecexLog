import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
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

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, login, email, position, password } = request.body;

    const updateProfile = container.resolve(UpdateUserService);

    const user = await updateProfile.execute({
      user_id,
      name,
      login,
      email,
      position,
      password,
    });

    return response.json(classToClass(user));
  }
}
