import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureAuthenticationPossibility from '@shared/infra/http/middlewares/ensureAuthenticationPossibility';

import HolidaysController from '../controllers/HolidaysController';

const holidaysRouter = Router();

const holidaysController = new HolidaysController();

holidaysRouter.get(
  '/all',
  ensureAuthenticationPossibility,
  holidaysController.show,
);

holidaysRouter.post(
  '/',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        city_name: Joi.string().required(),
        initial_date: Joi.string().max(6),
        end_date: Joi.string().max(6),
      },
    },
    {
      allowUnknown: true,
    },
  ),
  holidaysController.create,
);

holidaysRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        city_name: Joi.string().required(),
        initial_date: Joi.string().max(6),
        end_date: Joi.string().max(6),
      },
    },
    {
      allowUnknown: true,
    },
  ),
  holidaysController.update,
);

holidaysRouter.delete('/:id', ensureAuthenticated, holidaysController.delete);

export default holidaysRouter;
