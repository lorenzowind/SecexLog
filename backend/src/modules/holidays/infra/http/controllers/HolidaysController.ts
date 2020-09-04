import { Request, Response } from 'express';
import { container } from 'tsyringe';


import ListHolidaysService from '@modules/holidays/services/ListHolidayService';
import CreateHolidaysService from '@modules/holidays/services/CreateHolidayService';
import UpdateHolidaysService from '@modules/holidays/services/UpdateHolidayService';
import DeleteHolidaysService from '@modules/holidays/services/DeleteHolidayService';

export default class HolidaysController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id ? request.user.id : null;

    const { search = '', page = 1 } = request.query;

    const listHolidays = container.resolve(ListHolidaysService);

    const holidays = await listHolidays.execute(
      String(search),
      Number(page),
      user_id,
    );

    return response.json(holidays);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      city_name,
      initial_date,
      end_date
    } = request.body;

    const createHoliday = container.resolve(CreateHolidaysService);

    const holiday = await createHoliday.execute({
      name,
      city_name,
      initial_date,
      end_date,
    });

    return response.json(holiday);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      city_name,
      initial_date,
      end_date,
    } = request.body;

    const updateCity = container.resolve(UpdateHolidaysService);

    const city = await updateCity.execute({
      id,
      name,
      city_name,
      initial_date,
      end_date,
    });

    return response.json(city);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteHoliday = container.resolve(DeleteHolidaysService);

    await deleteHoliday.execute(id);

    return response.status(200).send();
  }
}
