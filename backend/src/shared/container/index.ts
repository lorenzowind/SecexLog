import { container } from 'tsyringe';

import './providers/index';
import '@modules/users/providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);
