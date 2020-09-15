import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import HolidaysController from '../controllers/HolidaysController';

const holidaysRouter = Router();

const holidaysController = new HolidaysController();

holidaysRouter.get(
  '/pagination/all',
  ensureAuthenticated,
  holidaysController.pagination,
);

holidaysRouter.get('/all', ensureAuthenticated, holidaysController.show);

holidaysRouter.get(
  '/{city_id}',
  ensureAuthenticated,
  holidaysController.filter,
);

holidaysRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
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
  ensureIsAdmin,
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        initial_date: Joi.string().max(6).required(),
        end_date: Joi.string().max(6).required(),
      },
    },
    {
      allowUnknown: true,
    },
  ),
  holidaysController.update,
);

holidaysRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  holidaysController.delete,
);

export default holidaysRouter;
