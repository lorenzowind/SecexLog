import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import PathsController from '../controllers/PathsController';

const pathsRouter = Router();

const pathsController = new PathsController();

pathsRouter.get('/all', ensureAuthenticated, pathsController.show);

pathsRouter.get('/all/origin', ensureAuthenticated, pathsController.origin);

pathsRouter.get(
  '/all/destination',
  ensureAuthenticated,
  pathsController.destination,
);

pathsRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      origin_city_id: Joi.string().required(),
      destination_city_id: Joi.string().required(),
      modal_id: Joi.string().required(),
      provider_id: Joi.string().required(),
      boarding_days: Joi.string().required(),
      boarding_times: Joi.string().required(),
      duration: Joi.number().required(),
      mileage: Joi.number().required(),
      cost: Joi.number().required(),
      boarding_place: Joi.string().required(),
      departure_place: Joi.string().required(),
      is_hired: Joi.boolean().required(),
    },
  }),
  pathsController.create,
);

pathsRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      origin_city_id: Joi.string().required(),
      destination_city_id: Joi.string().required(),
      modal_id: Joi.string().required(),
      provider_id: Joi.string().required(),
      boarding_days: Joi.string().required(),
      boarding_times: Joi.string().required(),
      duration: Joi.number().required(),
      mileage: Joi.number().required(),
      cost: Joi.number().required(),
      boarding_place: Joi.string().required(),
      departure_place: Joi.string().required(),
      is_hired: Joi.boolean().required(),
    },
  }),
  pathsController.update,
);

pathsRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  pathsController.delete,
);

export default pathsRouter;
