import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SearchesController from '../controllers/SearchesController';

const searchesRouter = Router();

const searchesController = new SearchesController();

searchesRouter.post(
  '/manual',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array().items(
        Joi.object({
          origin_city_id: Joi.string().required(),
          destination_city_id: Joi.string().required(),
          date: Joi.string().required(),
        }),
      ),
    },
  }),
  searchesController.manual,
);

export default searchesRouter;
