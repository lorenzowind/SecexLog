import { Request, Response, NextFunction } from 'express';

import ensureAuthenticated from './ensureAuthenticated';

export default function ensureAuthenticationPossibility(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (request.headers.authorization) {
    ensureAuthenticated(request, response, next);
  }

  request.user = {
    id: null,
  };

  return next();
}
