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
        return ['Segunda-feira', 'seg'];
      }
      case 1: {
        return ['Terça-feira', 'ter'];
      }
      case 2: {
        return ['Quarta-feira', 'qua'];
      }
      case 3: {
        return ['Quinta-feira', 'qui'];
      }
      case 4: {
        return ['Sexta-feira', 'sex'];
      }
      case 5: {
        return ['Sábado', 'sab'];
      }
      default: {
        return ['Domingo', 'dom'];
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

    const newHoursString =
      String(newHours).length === 1 ? `${String(newHours)}0` : String(newHours);

    const newMinutesString =
      String(newMinutes).length === 1
        ? `${String(newMinutes)}0`
        : String(newMinutes);

    return `${String(newHoursString)}:${newMinutesString}`;
  }

  private compareTime(time1: string, time2: string) {
    const auxTime1 = time1.split(':');
    const auxTime2 = time2.split(':');

    const totalMinutesTime1 = Number(auxTime1[0]) * 60 + Number(auxTime1[1]);
    const totalMinutesTime2 = Number(auxTime2[0]) * 60 + Number(auxTime2[1]);

    if (totalMinutesTime1 === totalMinutesTime2) {
      return 0;
    }

    if (totalMinutesTime1 > totalMinutesTime2) {
      return 1;
    }

    return -1;
  }

  public async execute({
    data,
  }: IManualSearchRequestDTO): Promise<ISearchResponseDTO> {
    const result: ISearchResponseDTO = {} as ISearchResponseDTO;

    let lastPathTimeArray: string[];

    for (let dataIndex = 0; dataIndex < data.length; dataIndex += 1) {
      const currentPathTimeArray: string[] = [];

      const checkOriginCityExists = await this.citiesRepository.findById(
        data[dataIndex].origin_city_id,
      );

      if (!checkOriginCityExists) {
        throw new AppError('Origin city not found.');
      }

      const checkDestinationCityExists = await this.citiesRepository.findById(
        data[dataIndex].destination_city_id,
      );

      if (!checkDestinationCityExists) {
        throw new AppError('Destination city not found.');
      }

      if (
        data[dataIndex].origin_city_id === data[dataIndex].destination_city_id
      ) {
        throw new AppError('Origin and destination city can not be the same');
      }

      const date1 = moment(data[dataIndex].date, 'DD/MM/YYYY');

      if (dataIndex < data.length - 1) {
        if (
          data[dataIndex].destination_city_id !==
          data[dataIndex + 1].origin_city_id
        ) {
          throw new AppError('Paths flow is not valid.');
        }

        const date2 = new Date(
          moment(data[dataIndex + 1].date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        );

        if (new Date(date1.format('YYYY-MM-DD')) > date2) {
          throw new AppError('Date is not valid.');
        }
      }

      const paths = await this.pathsRepository.findAllByOriginAndDestinationCity(
        data[dataIndex].origin_city_id,
        data[dataIndex].destination_city_id,
      );

      if (paths.length) {
        for (let pathIndex = 0; pathIndex < paths.length; pathIndex += 1) {
          const weekDay = this.getTransformedDay(
            new Date(date1.format('YYYY-MM-DD')).getDay(),
          );

          const pathWeekDayArray = paths[pathIndex].boarding_days.split(', ');
          const pathTimeArray = paths[pathIndex].boarding_times.split(', ');

          const multipleIndexFound = this.findMultipleIndex(
            pathWeekDayArray,
            weekDay[0],
          );

          const pathModal = await this.modalsRepository.findById(
            paths[pathIndex].modal_id,
          );

          const pathProvider = await this.providersRepository.findById(
            paths[pathIndex].provider_id,
          );

          const observations: { observation: string }[] = [];

          const nationalHolidays = await this.holidaysRepository.findNationalByDate(
            data[dataIndex].date,
          );

          if (nationalHolidays) {
            observations.push({
              observation: `Feriado nacional em ${data[dataIndex].date}`,
            });
          }

          const specificHolidays = await this.holidaysRepository.findSpecificByDate(
            data[dataIndex].destination_city_id,
            data[dataIndex].date,
          );

          if (specificHolidays) {
            observations.push({
              observation: `Feriado local em ${data[dataIndex].date}`,
            });
          }

          if (
            checkDestinationCityExists.initial_flood_date &&
            checkDestinationCityExists.end_flood_date
          ) {
            const initialFloodDate = `${checkDestinationCityExists.initial_flood_date}/2020`;
            const endFloodDate = `${checkDestinationCityExists.end_flood_date}/2020`;

            const initialFormattedFloodDate = new Date(
              moment(initialFloodDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            );

            const endFormattedFloodDate = new Date(
              moment(endFloodDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            );

            const auxDate = new Date(
              moment(data[dataIndex].date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            );

            if (
              initialFormattedFloodDate <= auxDate &&
              auxDate <= endFormattedFloodDate
            ) {
              observations.push({
                observation: `Período de cheias em ${data[dataIndex].date}`,
              });
            }
          }

          const auxPaths: PathData[] = [];

          multipleIndexFound.map(indexFound => {
            currentPathTimeArray.push(pathTimeArray[indexFound]);

            auxPaths.push({
              selected_period: {
                selected_date: data[dataIndex].date,
                selected_initial_week_day: weekDay[1],
                selected_initial_time: pathTimeArray[indexFound],
                selected_final_week_day: weekDay[1],
                selected_final_time: this.calculateResultTime(
                  pathTimeArray[indexFound],
                  paths[pathIndex].duration,
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
                boarding_place: paths[pathIndex].boarding_place,
                departure_place: paths[pathIndex].departure_place,
                cost: paths[pathIndex].cost,
                duration: paths[pathIndex].duration,
                origin_city_name: checkOriginCityExists.name,
                destination_city_name: checkDestinationCityExists.name,
                mileage: paths[pathIndex].mileage,
                modal_name: pathModal ? pathModal.name : '',
                modal_image: pathModal ? pathModal.image : '',
                provider_name: pathProvider ? pathProvider.name : '',
              },
            });
          });

          if (dataIndex === 0) {
            result.result = {
              general_info: {
                origin_city_name: checkOriginCityExists.name,
                destination_cities_names: [
                  {
                    destination_city_name: checkDestinationCityExists.name,
                  },
                ],
                initial_date: data[dataIndex].date,
                final_date: data[dataIndex].date,
              },
              paths_result: [],
            };

            multipleIndexFound.map((_indexFound, index) => {
              result.result.paths_result.push({
                distance: paths[pathIndex].mileage,
                initial_date: data[dataIndex].date,
                final_date: data[dataIndex].date,
                observations,
                price: paths[pathIndex].cost,
                util_days: 0,
                paths: [auxPaths[index]],
              });

              currentPathTimeArray[index] = this.calculateResultTime(
                currentPathTimeArray[index],
                paths[pathIndex].duration,
              );
            });
          } else {
            result.result.general_info.final_date = data[dataIndex].date;

            if (result.result.general_info.destination_cities_names) {
              if (
                !result.result.general_info.destination_cities_names.includes({
                  destination_city_name: checkDestinationCityExists.name,
                })
              ) {
                result.result.general_info.destination_cities_names.push({
                  destination_city_name: checkDestinationCityExists.name,
                });
              }
            }

            const auxPathsResult = result.result.paths_result;

            result.result.paths_result = [];

            auxPathsResult.map((auxPathResult, auxPathsIndex) => {
              const date2 = moment(auxPathResult.final_date, 'DD/MM/YYYY');

              multipleIndexFound.map((_indexFound, index) => {
                if (
                  this.compareTime(
                    lastPathTimeArray[auxPathsIndex],
                    currentPathTimeArray[index],
                  ) === -1
                ) {
                  result.result.paths_result.push({
                    distance:
                      Number(auxPathResult.distance) +
                      Number(paths[pathIndex].mileage),
                    initial_date: auxPathResult.initial_date,
                    final_date: data[dataIndex].date,
                    observations,
                    price:
                      Number(auxPathResult.price) +
                      Number(paths[pathIndex].cost),
                    util_days:
                      auxPathResult.util_days + date1.diff(date2, 'days'),
                    paths: [...auxPathResult.paths, auxPaths[index]],
                  });
                }

                currentPathTimeArray[index] = this.calculateResultTime(
                  currentPathTimeArray[index],
                  paths[pathIndex].duration,
                );
              });
            });
          }

          lastPathTimeArray = currentPathTimeArray;
        }
      } else {
        result.result = {
          general_info: {
            origin_city_name: checkOriginCityExists.name,
            destination_cities_names: [
              {
                destination_city_name: checkDestinationCityExists.name,
              },
            ],
            initial_date: data[dataIndex].date,
            final_date: data[dataIndex].date,
          },
          paths_result: [],
        };
      }
    }

    return result;
  }
}

export default ManualSearchService;
