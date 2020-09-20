import { Request, Response } from 'express';

export default class SearchController {
  public async manual(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;
    
    return response.json({});
  }  
}
