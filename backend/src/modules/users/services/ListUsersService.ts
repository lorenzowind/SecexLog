import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers();

    return users;
  }
}

export default ListUsersService;
