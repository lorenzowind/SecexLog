import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateOrUpdateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default class DraftUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllPaginationUsers(
    search: string,
    page: number,
  ): Promise<User[]> {
    const users = search
      ? this.users.filter(findUser => findUser.name.includes(search))
      : this.users;

    return users.slice((page - 1) * 10, page * 10);
  }

  public async findAllUsers(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.login === login);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: User): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users.splice(findIndex, 1);
  }
}
