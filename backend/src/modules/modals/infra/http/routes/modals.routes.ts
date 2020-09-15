import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import ModalsController from '../controllers/ModalsController';

const modalsRouter = Router();

const modalsController = new ModalsController();

modalsRouter.get(
  '/pagination/all',
  ensureAuthenticated,
  modalsController.pagination,
);

modalsRouter.get('/all', ensureAuthenticated, modalsController.show);

modalsRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      image: Joi.string().required(),
      is_safe: Joi.boolean().required(),
      is_cheap: Joi.boolean().required(),
      is_fast: Joi.boolean().required(),
    },
  }),
  modalsController.create,
);

modalsRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      image: Joi.string().required(),
      is_safe: Joi.boolean().required(),
      is_cheap: Joi.boolean().required(),
      is_fast: Joi.boolean().required(),
    },
  }),
  modalsController.update,
);

modalsRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  modalsController.delete,
);

export default modalsRouter;
