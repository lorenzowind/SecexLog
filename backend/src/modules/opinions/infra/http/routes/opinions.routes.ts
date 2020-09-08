import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import OpinionsController from '../controllers/OpinionsController';

const opinionsRouter = Router();

const opinionsController = new OpinionsController();

opinionsRouter.get('/all', ensureAuthenticated, opinionsController.show);

opinionsRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  opinionsController.create,
);

opinionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  opinionsController.delete,
);

export default opinionsRouter;
