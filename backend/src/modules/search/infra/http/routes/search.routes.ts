import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SearchController from '../controllers/SearchController';
const searchRouter = Router();
const searchController = new SearchController();

searchRouter.post(
  '/manual',
  celebrate(
    {
      [Segments.BODY]: {
        data: Joi.array().items(
          Joi.object({
            origin_city_id: Joi.string().required(),
            destination_city_id: Joi.string().required(),
            date: Joi.string().required()
          })
        )
      },
    },
    {
      allowUnknown: true,
    },
  ),
  searchController.manual,
);

export default searchRouter;
