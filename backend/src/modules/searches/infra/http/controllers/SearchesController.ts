import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ManualSearchService from '@modules/searches/services/ManualSearchService';

export default class SearchesController {
  public async manual(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const manualSearch = container.resolve(ManualSearchService);

    const result = await manualSearch.execute({
      data,
    });

    return response.json(result);
  }
}
