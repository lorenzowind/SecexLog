import { injectable, inject } from 'tsyringe';
import moment from 'moment';

import AppError from '@shared/errors/AppError';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';

import IManualSearchRequestDTO from '../dtos/IManualSearchRequestDTO';
import ISearchResponseDTO from '../dtos/ISearchResponseDTO';

@injectable()
class ManualSearchService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,
  ) {}

  public async execute({
    data,
  }: IManualSearchRequestDTO): Promise<ISearchResponseDTO> {
    const results: ISearchResponseDTO = {} as ISearchResponseDTO;

    for (let i = 0; i < data.length; i += 1) {
      const checkOriginCityExists = await this.citiesRepository.findById(
        data[i].origin_city_id,
      );

      if (!checkOriginCityExists) {
        throw new AppError('Origin city not found.');
      }
      const checkDestinationCityExists = await this.citiesRepository.findById(
        data[i].destination_city_id,
      );

      if (!checkDestinationCityExists) {
        throw new AppError('Destination city not found.');
      }

      if (data[i].origin_city_id === data[i].destination_city_id) {
        throw new AppError('Origin and destination city can not be the same');
      }

      if (i < data.length - 1) {
        const date1 = moment(data[i].date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const date2 = moment(data[i + 1].date, 'DD/MM/YYYY').format(
          'YYYY-MM-DD',
        );

        if (new Date(date1) > new Date(date2)) {
          throw new AppError('Date is invalid.');
        }
      }
    }

    return results;
  }
}

export default ManualSearchService;
