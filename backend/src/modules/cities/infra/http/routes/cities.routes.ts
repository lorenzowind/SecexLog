import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();

const citiesController = new CitiesController();

citiesRouter.get('/all', ensureAuthenticated, citiesController.show);

citiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.number().precision(6),
      longitude: Joi.number().precision(6),
      initial_flood_date: Joi.string().max(6),
      end_flood_date: Joi.string().max(6),
    },
  }),
  citiesController.create,
);

citiesRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.number().precision(6),
      longitude: Joi.number().precision(6),
      initial_flood_date: Joi.string().max(6),
      end_flood_date: Joi.string().max(6),
    },
  }),
  citiesController.update,
);

citiesRouter.delete('/:id', ensureAuthenticated, citiesController.delete);

export default citiesRouter;
