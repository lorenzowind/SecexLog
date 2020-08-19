import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      login: Joi.string().required(),
      password: Joi.string().required().min(6),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
