import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';
import holidaysRouter from '@modules/holidays/infra/http/routes/holidays.routes';
import opinionsRouter from '@modules/opinions/infra/http/routes/opinions.routes';
import modalsRouter from '@modules/modals/infra/http/routes/modals.routes';
import providersRouter from '@modules/providers/infra/http/routes/providers.routes';
import pathsRouter from '@modules/paths/infra/http/routes/paths.routes';

import searchesRouter from '@modules/searches/infra/http/routes/searches.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/cities', citiesRouter);
routes.use('/holidays', holidaysRouter);
routes.use('/opinions', opinionsRouter);
routes.use('/modals', modalsRouter);
routes.use('/providers', providersRouter);
routes.use('/paths', pathsRouter);

routes.use('/searches', searchesRouter);

export default routes;
