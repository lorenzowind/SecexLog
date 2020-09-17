import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/all', ensureAuthenticated, usersController.show);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      login: Joi.string().required(),
      email: Joi.string().email().required(),
      position: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      login: Joi.string().required(),
      email: Joi.string().email().required(),
      position: Joi.string().required(),
      password: Joi.string().min(6),
    },
  }),
  usersController.update,
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  usersController.delete,
);

export default usersRouter;
