import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateOrUpdateUserDTO';

export default interface IUsersRepository {
  findAllUsers(search: string, page: number): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByLogin(login: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}
