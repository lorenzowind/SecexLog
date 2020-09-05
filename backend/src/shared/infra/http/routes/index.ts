import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';
import holidaysRouter from '@modules/holidays/infra/http/routes/holidays.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/cities', citiesRouter);
routes.use('/holidays', holidaysRouter);

export default routes;
