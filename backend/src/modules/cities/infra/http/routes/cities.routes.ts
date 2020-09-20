import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticationPossibility from '@shared/infra/http/middlewares/ensureAuthenticationPossibility';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();

const citiesController = new CitiesController();

citiesRouter.get(
  '/all',
  ensureAuthenticationPossibility,
  citiesController.show,
);

citiesRouter.get('/related/:city_id', citiesController.related);

citiesRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        latitude: Joi.number().precision(6).allow(null),
        longitude: Joi.number().precision(6).allow(null),
        initial_flood_date: Joi.string().max(6).allow(''),
        end_flood_date: Joi.string().max(6).allow(''),
      },
    },
    {
      allowUnknown: true,
    },
  ),
  citiesController.create,
);

citiesRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        latitude: Joi.number().precision(6).allow(null),
        longitude: Joi.number().precision(6).allow(null),
        initial_flood_date: Joi.string().max(6).allow(''),
        end_flood_date: Joi.string().max(6).allow(''),
      },
    },
    {
      allowUnknown: true,
    },
  ),
  citiesController.update,
);

citiesRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  citiesController.delete,
);

export default citiesRouter;
