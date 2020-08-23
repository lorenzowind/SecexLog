import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateOrUpdateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { email } });

    return findUser;
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { login } });

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    Object.assign(user, { id: v4() });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UsersRepository;
