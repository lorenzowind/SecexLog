import { injectable, inject } from 'tsyringe';
import moment from 'moment';

import AppError from '@shared/errors/AppError';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';
import IPathsRepository from '@modules/paths/repositories/IPathsRepository';
import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import IManualSearchRequestDTO from '../dtos/IManualSearchRequestDTO';
import ISearchResponseDTO, { PathData } from '../dtos/ISearchResponseDTO';

@injectable()
class ManualSearchService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('HolidaysRepository')
    private holidaysRepository: IHolidaysRepository,

    @inject('PathsRepository')
    private pathsRepository: IPathsRepository,

    @inject('ModalsRepository')
    private modalsRepository: IModalsRepository,

    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  private getTransformedDay(day: number) {
    switch (day) {
      case 0: {
        return ['Domingo', 'dom'];
      }
      case 1: {
        return ['Segunda-feira', 'seg'];
      }
      case 2: {
        return ['Terça-feira', 'ter'];
      }
      case 3: {
        return ['Quarta-feira', 'qua'];
      }
      case 4: {
        return ['Quinta-feira', 'qui'];
      }
      case 5: {
        return ['Sexta-feira', 'sex'];
      }
      case 6: {
        return ['Sábado', 'sab'];
      }
      default: {
        return ['', ''];
      }
    }
  }

  private findMultipleIndex(array: string[], str: string) {
    const multipleIndex: number[] = [];

    array.map((value, index) => {
      if (value === str) {
        multipleIndex.push(index);
      }
    });

    return multipleIndex;
  }

  private calculateResultTime(time: string, minutes: number) {
    const quotient = Math.floor(minutes / 60);
    const remainder = minutes % 60;

    let newHours = Number(time.split(':')[0]) + quotient;
    let newMinutes = Number(time.split(':')[1]) + remainder;

    if (newMinutes > 60) {
      newHours += 1;
      newMinutes %= 60;
    }

    return `${String(newHours)}:${String(newMinutes)}`;
  }

  public async execute({
    data,
  }: IManualSearchRequestDTO): Promise<ISearchResponseDTO> {
    const result: ISearchResponseDTO = {} as ISearchResponseDTO;

    for (let i = 0; i < data.length; i += 1) {
      const checkOriginCityExists = await this.citiesRepository.findById(
        data[i].origin_city_id,
      );

      if (!checkOriginCityExists) {
        throw new AppError('Origin city not found.');
      }

      if (i === 0) {
        result.result.general_info.origin_city_name =
          checkOriginCityExists.name;
      }

      const checkDestinationCityExists = await this.citiesRepository.findById(
        data[i].destination_city_id,
      );

      if (!checkDestinationCityExists) {
        throw new AppError('Destination city not found.');
      }

      if (
        i !== 0 &&
        !result.result.general_info.destination_cities_names.includes({
          destination_city_name: checkDestinationCityExists.name,
        })
      ) {
        result.result.general_info.destination_cities_names.push({
          destination_city_name: checkDestinationCityExists.name,
        });
      }

      if (data[i].origin_city_id === data[i].destination_city_id) {
        throw new AppError('Origin and destination city can not be the same');
      }

      const date1 = moment(data[i].date, 'DD/MM/YYYY');

      if (i < data.length - 1) {
        if (data[i].destination_city_id !== data[i + 1].origin_city_id) {
          throw new AppError('Paths flow is not valid.');
        }

        const date2 = new Date(
          moment(data[i + 1].date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        );

        if (new Date(date1.format('YYYY-MM-DD')) > date2) {
          throw new AppError('Date is not valid.');
        }
      }

      const paths = await this.pathsRepository.findAllByOriginAndDestinationCity(
        data[i].origin_city_id,
        data[i].destination_city_id,
      );

      paths.map(async path => {
        const weekDay = this.getTransformedDay(
          new Date(date1.format('YYYY-MM-DD')).getDay(),
        );

        // this.holidaysRepository.findNationalByDate();

        const pathWeekDayArray = path.boarding_days.split(', ');
        const pathTimeArray = path.boarding_times.split(', ');

        const multipleIndexFound = this.findMultipleIndex(
          pathWeekDayArray,
          weekDay[0],
        );

        if (multipleIndexFound) {
          const pathModal = await this.modalsRepository.findById(path.modal_id);

          const pathProvider = await this.providersRepository.findById(
            path.provider_id,
          );

          const auxPaths: PathData[] = [];

          multipleIndexFound.map(indexFound => {
            auxPaths.push({
              selected_period: {
                selected_date: data[i].date,
                selected_initial_week_day: weekDay[1],
                selected_initial_time: pathTimeArray[indexFound],
                selected_final_week_day: weekDay[1],
                selected_final_time: this.calculateResultTime(
                  pathTimeArray[indexFound],
                  path.duration,
                ),
              },
              cities_location: {
                origin_city_latitude: checkOriginCityExists.latitude || 0,
                origin_city_longitude: checkOriginCityExists.longitude || 0,
                destination_city_latitude:
                  checkDestinationCityExists.latitude || 0,
                destination_city_longitude:
                  checkDestinationCityExists.longitude || 0,
              },
              path_data: {
                boarding_place: path.boarding_place,
                departure_place: path.departure_place,
                cost: path.cost,
                duration: path.duration,
                origin_city_name: checkOriginCityExists.name,
                destination_city_name: checkDestinationCityExists.name,
                mileage: path.mileage,
                modal_name: pathModal ? pathModal.name : '',
                modal_image: pathModal ? pathModal.image : '',
                provider_name: pathProvider ? pathProvider.name : '',
              },
            });
          });

          if (i === 0) {
            result.result.general_info.initial_date = data[i].date;
            result.result.general_info.final_date = data[i].date;

            multipleIndexFound.map(_indexFound => {
              result.result.paths_result.push({
                distance: path.mileage,
                initial_date: data[i].date,
                final_date: data[i].date,
                observations: [{ observation: '' }],
                price: path.cost,
                util_days: 0,
                paths: auxPaths,
              });
            });
          } else {
            result.result.general_info.final_date = data[i].date;

            const auxPathsResult = result.result.paths_result;

            result.result.paths_result = [];

            auxPathsResult.map(auxPathResult => {
              multipleIndexFound.map(_indexFound => {
                const date2 = moment(auxPathResult.final_date, 'DD/MM/YYYY');
                auxPathResult.util_days += date1.diff(date2, 'days');

                result.result.paths_result.push({
                  distance: auxPathResult.distance + path.mileage,
                  initial_date: auxPathResult.initial_date,
                  final_date: data[i].date,
                  observations: [{ observation: '' }],
                  price: auxPathResult.price + path.cost,
                  util_days:
                    auxPathResult.util_days + date1.diff(date2, 'days'),
                  paths: auxPaths,
                });
              });
            });
          }
        } else {
          return {} as ISearchResponseDTO;
        }
      });
    }

    return result;
  }
}

export default ManualSearchService;
