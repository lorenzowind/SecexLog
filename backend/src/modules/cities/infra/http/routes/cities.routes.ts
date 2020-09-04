import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureAuthenticationPossibility from '@shared/infra/http/middlewares/ensureAuthenticationPossibility';

import CitiesController from '../controllers/CytiesController'; 

const citiesRouter = Router();

const citiesController = new CitiesController();

citiesRouter.get(
  '/all',
  ensureAuthenticationPossibility,
  citiesController.show,
);

citiesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        latitude: Joi.number().precision(6),
        longitude: Joi.number().precision(6),
        initial_flood_date: Joi.string().max(6),
        end_flood_date: Joi.string().max(6),
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
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        latitude: Joi.number().precision(6),
        longitude: Joi.number().precision(6),
        initial_flood_date: Joi.string().max(6),
        end_flood_date: Joi.string().max(6),
      },
    },
    {
      allowUnknown: true,
    },
  ),
  citiesController.update,
);

citiesRouter.delete('/:id', ensureAuthenticated, citiesController.delete);

export default citiesRouter;
