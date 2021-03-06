import { container } from 'tsyringe';

import './providers/index';
import '@modules/users/providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';

import IRelatedCitiesRepository from '@modules/cities/repositories/IRelatedCitiesRepository';
import RelatedCitiesRepository from '@modules/cities/infra/typeorm/repositories/RelatedCitiesRepository';

import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';
import HolidaysRepository from '@modules/holidays/infra/typeorm/repositories/HolidaysRepository';

import IOpinionsRepository from '@modules/opinions/repositories/IOpinionsRepository';
import OpinionsRepository from '@modules/opinions/infra/typeorm/repositories/OpinionsRepository';

import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import ModalsRepository from '@modules/modals/infra/typeorm/repositories/ModalsRepository';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ProvidersRepository from '@modules/providers/infra/typeorm/repositories/ProvidersRepository';

import IPathsRepository from '@modules/paths/repositories/IPathsRepository';
import PathsRepository from '@modules/paths/infra/typeorm/repositories/PathsRepository';

import ISearchesRepository from '@modules/searches/repositories/ISearchesRepository';
import SearchesRepository from '@modules/searches/infra/typeorm/repositories/SearchesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IRelatedCitiesRepository>(
  'RelatedCitiesRepository',
  RelatedCitiesRepository,
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

container.registerSingleton<IModalsRepository>(
  'ModalsRepository',
  ModalsRepository,
);

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IPathsRepository>(
  'PathsRepository',
  PathsRepository,
);

container.registerSingleton<ISearchesRepository>(
  'SearchesRepository',
  SearchesRepository,
);
