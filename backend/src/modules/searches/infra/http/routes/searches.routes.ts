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

searchesRouter.post(
  '/report',
  celebrate({
    [Segments.BODY]: {
      data: Joi.object({
        price: Joi.number().required(),
        util_days: Joi.number().required(),
        modal_safety_factor: Joi.number().required(),
        distance: Joi.number().required(),
        initial_date: Joi.string().required(),
        final_date: Joi.string().required(),
        observations: Joi.array().items(
          Joi.object({
            observation: Joi.string().required(),
          }),
        ),
        paths: Joi.array().items(
          Joi.object({
            selected_period: Joi.object({
              selected_date: Joi.string().required(),
              selected_initial_time: Joi.string().required(),
              selected_final_time: Joi.string().required(),
              selected_initial_week_day: Joi.string().required(),
              selected_final_week_day: Joi.string().required(),
            }),
            cities_location: Joi.object({
              origin_city_latitude: Joi.number().required(),
              origin_city_longitude: Joi.number().required(),
              destination_city_latitude: Joi.number().required(),
              destination_city_longitude: Joi.number().required(),
            }),
            path_data: Joi.object({
              origin_city_name: Joi.string().required(),
              destination_city_name: Joi.string().required(),
              modal_name: Joi.string().required(),
              modal_image: Joi.string().required(),
              modal_is_cheap: Joi.boolean().required(),
              modal_is_fast: Joi.boolean().required(),
              modal_is_safe: Joi.boolean().required(),
              provider_name: Joi.string().required(),
              duration: Joi.number().required(),
              mileage: Joi.number().required(),
              cost: Joi.number().required(),
              boarding_place: Joi.string().required(),
              departure_place: Joi.string().required(),
            }),
          }),
        ),
      }),
    },
  }),
  searchesController.report,
);

searchesRouter.post(
  '/send-report',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      data: Joi.object({
        price: Joi.number().required(),
        util_days: Joi.number().required(),
        modal_safety_factor: Joi.number().required(),
        distance: Joi.number().required(),
        initial_date: Joi.string().required(),
        final_date: Joi.string().required(),
        observations: Joi.array().items(
          Joi.object({
            observation: Joi.string().required(),
          }),
        ),
        paths: Joi.array().items(
          Joi.object({
            selected_period: Joi.object({
              selected_date: Joi.string().required(),
              selected_initial_time: Joi.string().required(),
              selected_final_time: Joi.string().required(),
              selected_initial_week_day: Joi.string().required(),
              selected_final_week_day: Joi.string().required(),
            }),
            cities_location: Joi.object({
              origin_city_latitude: Joi.number().required(),
              origin_city_longitude: Joi.number().required(),
              destination_city_latitude: Joi.number().required(),
              destination_city_longitude: Joi.number().required(),
            }),
            path_data: Joi.object({
              origin_city_name: Joi.string().required(),
              destination_city_name: Joi.string().required(),
              modal_name: Joi.string().required(),
              modal_image: Joi.string().required(),
              modal_is_cheap: Joi.boolean().required(),
              modal_is_fast: Joi.boolean().required(),
              modal_is_safe: Joi.boolean().required(),
              provider_name: Joi.string().required(),
              duration: Joi.number().required(),
              mileage: Joi.number().required(),
              cost: Joi.number().required(),
              boarding_place: Joi.string().required(),
              departure_place: Joi.string().required(),
            }),
          }),
        ),
      }),
    },
  }),
  searchesController.send,
);

export default searchesRouter;
