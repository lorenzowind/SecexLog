import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHolidaysService from '@modules/holidays/services/ListHolidaysService';
import ListFilteredHolidaysService from '@modules/holidays/services/ListFilteredHolidaysService';
import CreateHolidayService from '@modules/holidays/services/CreateHolidayService';
import UpdateHolidayService from '@modules/holidays/services/UpdateHolidayService';
import DeleteHolidayService from '@modules/holidays/services/DeleteHolidayService';

export default class HolidaysController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { search = '' } = request.query;

    const listHolidays = container.resolve(ListHolidaysService);

    const holidays = await listHolidays.execute(String(search), user_id);

    return response.json(holidays);
  }

  public async filter(request: Request, response: Response): Promise<Response> {
    const { city_id } = request.params;

    const listFilteredHolidays = container.resolve(ListFilteredHolidaysService);

    const filteredHolidays = await listFilteredHolidays.execute(city_id);

    return response.json(filteredHolidays);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, city_id, initial_date, end_date } = request.body;

    const createHoliday = container.resolve(CreateHolidayService);

    const holiday = await createHoliday.execute({
      name,
      city_id,
      initial_date,
      end_date,
    });

    return response.json(holiday);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, city_id, initial_date, end_date } = request.body;

    const updateHoliday = container.resolve(UpdateHolidayService);

    const holiday = await updateHoliday.execute({
      id,
      name,
      city_id,
      initial_date,
      end_date,
    });

    return response.json(holiday);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteHoliday = container.resolve(DeleteHolidayService);

    await deleteHoliday.execute(id);

    return response.status(200).send();
  }
}
