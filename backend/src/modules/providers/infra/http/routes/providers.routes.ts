import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.get('/all', ensureAuthenticated, providersController.show);

providersRouter.get(
  '/{modal_id}',
  ensureAuthenticated,
  providersController.filter,
);

providersRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone_number: Joi.string().max(16).required(),
      email: Joi.string().required(),
      modal_id: Joi.string().required(),
      preference: Joi.string().valid('CPF', 'CNPJ'),
      preference_data: Joi.string().required(),
    },
  }),
  providersController.create,
);

providersRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone_number: Joi.string().max(16).required(),
      email: Joi.string().required(),
      modal_id: Joi.string().required(),
      preference: Joi.string().valid('CPF', 'CPNJ'),
      preference_data: Joi.string().required(),
    },
  }),
  providersController.update,
);

providersRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  providersController.delete,
);

export default providersRouter;
