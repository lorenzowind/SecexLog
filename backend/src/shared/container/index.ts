import { container } from 'tsyringe';

import './providers/index';
import '@modules/users/providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';

import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';
import HolidaysRepository from '@modules/holidays/infra/typeorm/repositories/HolidaysRepository';

import IOpinionsRepository from '@modules/opinions/repositories/IOpinionsRepository';
import OpinionsRepository from '@modules/opinions/infra/typeorm/repositories/OpinionsRepository';

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

container.registerSingleton<IHolidaysRepository>(
  'HolidaysRepository',
  HolidaysRepository,
);

container.registerSingleton<IOpinionsRepository>(
  'OpinionsRepository',
  OpinionsRepository,
);
