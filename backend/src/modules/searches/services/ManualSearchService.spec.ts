import AppError from '@shared/errors/AppError';

import DraftCitiesRepository from '@modules/cities/repositories/drafts/DraftCitiesRepository';
import DraftHolidaysRepository from '@modules/holidays/repositories/drafts/DraftHolidaysRepository';

import ManualSearchService from './ManualSearchService';

let draftCitiesRepository: DraftCitiesRepository;
let draftHolidaysRepository: DraftHolidaysRepository;

let manualSearch: ManualSearchService;

describe('ManualSearch', () => {
  beforeEach(() => {
    draftCitiesRepository = new DraftCitiesRepository();
    draftHolidaysRepository = new DraftHolidaysRepository();

    manualSearch = new ManualSearchService(
      draftCitiesRepository,
      draftHolidaysRepository,
    );
  });
});
