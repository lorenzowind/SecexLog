import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ManualSearchService from '@modules/searches/services/ManualSearchService';
import GetReportService from '@modules/searches/services/GetReportService';
import SendReportService from '@modules/searches/services/SendReportService';

export default class SearchesController {
  public async manual(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const manualSearch = container.resolve(ManualSearchService);

    const result = await manualSearch.execute({
      data,
    });

    return response.json(result);
  }

  public async report(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const getReport = container.resolve(GetReportService);

    const filePath = await getReport.execute(data);

    return response.json(filePath);
  }

  public async send(request: Request, response: Response): Promise<Response> {
    const { email, data } = request.body;

    const getReport = container.resolve(GetReportService);

    const filePath = await getReport.execute(data);

    const sendReport = container.resolve(SendReportService);

    await sendReport.execute(filePath, email);

    return response.status(204).json();
  }
}
