import { injectable, inject } from 'tsyringe';
import moment from 'moment';

import AppError from '@shared/errors/AppError';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';
import IPathsRepository from '@modules/paths/repositories/IPathsRepository';
import IModalsRepository from '@modules/modals/repositories/IModalsRepository';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import IManualSearchRequestDTO from '../dtos/IManualSearchRequestDTO';
import ISearchResponseDTO, {
  PathData,
  PathResultsSection,
} from '../dtos/ISearchResponseDTO';

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

    if (newHours > 24) {
      newHours %= 24;
    }

    const newHoursString =
      String(newHours).length === 1 ? `0${String(newHours)}` : String(newHours);

    const newMinutesString =
      String(newMinutes).length === 1
        ? `0${String(newMinutes)}`
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

  private getSafetyFactor(paths: PathData[]) {
    let modal_safety_factor = 0;

    paths.map(path => {
      modal_safety_factor += path.path_data.modal_is_safe ? 1 : 0;
    });

    return modal_safety_factor;
  }

  public async execute({
    data,
  }: IManualSearchRequestDTO): Promise<ISearchResponseDTO> {
    const result: ISearchResponseDTO = {} as ISearchResponseDTO;
    const currentRootPathResults: PathResultsSection[][] = [];

    let lastPathTimeArray: [string, string][] = [];

    for (let dataIndex = 0; dataIndex < data.length; dataIndex += 1) {
      let currentPathTimeAccArray: [string, string][] = [];

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

      const paths =
        await this.pathsRepository.findAllByOriginAndDestinationCity(
          data[dataIndex].origin_city_id,
          data[dataIndex].destination_city_id,
        );

      if (paths.length) {
        if (dataIndex !== 0 && result.result) {
          currentRootPathResults.push(
            result.result.paths_result.filter(
              path => path.paths.length === dataIndex,
            ),
          );
          // console.log(
          //   currentRootPathResults[currentRootPathResults.length - 1].length,
          //   result.result.paths_result.length,
          // );
        }

        for (let pathIndex = 0; pathIndex < paths.length; pathIndex += 1) {
          const currentPathTimeArray: [string, string][] = [];

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

          const currentObservations: { observation: string }[] = [];

          const nationalHolidays =
            await this.holidaysRepository.findNationalByDate(
              data[dataIndex].date,
            );

          if (nationalHolidays && nationalHolidays.length) {
            currentObservations.push({
              observation: `Feriado nacional dia ${data[dataIndex].date}`,
            });
          }

          let specificHolidays =
            await this.holidaysRepository.findSpecificByDate(
              data[dataIndex].origin_city_id,
              data[dataIndex].date,
            );

          if (specificHolidays && specificHolidays.length) {
            currentObservations.push({
              observation: `Feriado local em ${checkOriginCityExists.name} dia ${data[dataIndex].date}`,
            });
          } else {
            specificHolidays = await this.holidaysRepository.findSpecificByDate(
              data[dataIndex].destination_city_id,
              data[dataIndex].date,
            );

            if (specificHolidays && specificHolidays.length) {
              currentObservations.push({
                observation: `Feriado local em ${checkDestinationCityExists.name} dia ${data[dataIndex].date}`,
              });
            }
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
              currentObservations.push({
                observation: `Período de cheias em ${data[dataIndex].date}`,
              });
            }
          }

          const auxPaths: PathData[] = [];

          multipleIndexFound.map(indexFound => {
            currentPathTimeArray.push([
              data[dataIndex].date,
              pathTimeArray[indexFound],
            ]);

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
                modal_is_cheap: pathModal ? pathModal.is_cheap : false,
                modal_is_fast: pathModal ? pathModal.is_fast : false,
                modal_is_safe: pathModal ? pathModal.is_safe : false,
                provider_name: pathProvider ? pathProvider.name : '',
              },
            });
          });

          if (auxPaths.length) {
            if (dataIndex === 0) {
              if (pathIndex === 0) {
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

              multipleIndexFound.map((_indexFound, index) => {
                result.result.paths_result.push({
                  distance: paths[pathIndex].mileage,
                  initial_date: data[dataIndex].date,
                  final_date: data[dataIndex].date,
                  observations: currentObservations,
                  price: paths[pathIndex].cost,
                  util_days: 0,
                  modal_safety_factor: auxPaths[index].path_data.modal_is_safe
                    ? 1
                    : 0,
                  paths: [auxPaths[index]],
                });

                currentPathTimeArray[index] = [
                  currentPathTimeArray[index][0],
                  this.calculateResultTime(
                    currentPathTimeArray[index][1],
                    paths[pathIndex].duration,
                  ),
                ];
              });

              currentPathTimeAccArray =
                currentPathTimeAccArray.concat(currentPathTimeArray);
            } else {
              result.result.general_info.final_date = data[dataIndex].date;

              if (result.result.general_info.destination_cities_names) {
                const cityExists =
                  result.result.general_info.destination_cities_names.find(
                    destinationCity =>
                      destinationCity.destination_city_name ===
                      checkDestinationCityExists.name,
                  );

                if (!cityExists) {
                  result.result.general_info.destination_cities_names.push({
                    destination_city_name: checkDestinationCityExists.name,
                  });
                }
              }

              const auxPathResults: PathResultsSection[] = [];

              // console.log(
              //   dataIndex,
              //   pathIndex,
              //   currentRootPathResults[currentRootPathResults.length - 1]
              //     .length,
              //   result.result.paths_result.length,
              //   multipleIndexFound.length,
              //   currentPathTimeArray.length,
              //   lastPathTimeArray.length,
              // );

              currentRootPathResults[currentRootPathResults.length - 1].map(
                (currentRootPathResult, currentRootPathIndex) => {
                  const date2 = moment(
                    currentRootPathResult.final_date,
                    'DD/MM/YYYY',
                  );

                  multipleIndexFound.map((_indexFound, index) => {
                    let is_possible = false;

                    if (
                      lastPathTimeArray[currentRootPathIndex][0] ===
                      currentPathTimeArray[index][0]
                    ) {
                      if (
                        this.compareTime(
                          lastPathTimeArray[currentRootPathIndex][1],
                          currentPathTimeArray[index][1],
                        ) === -1
                      ) {
                        is_possible = true;
                      }
                    } else {
                      is_possible = true;
                    }

                    if (is_possible) {
                      auxPathResults.push({
                        distance:
                          Number(currentRootPathResult.distance) +
                          Number(paths[pathIndex].mileage),
                        initial_date: currentRootPathResult.initial_date,
                        final_date: data[dataIndex].date,
                        observations:
                          currentRootPathResult.observations.concat(
                            currentObservations,
                          ),
                        price:
                          Number(currentRootPathResult.price) +
                          Number(paths[pathIndex].cost),
                        util_days:
                          currentRootPathResult.util_days +
                          date1.diff(date2, 'days'),
                        modal_safety_factor: this.getSafetyFactor(
                          currentRootPathResult.paths,
                        ),
                        paths: [
                          ...currentRootPathResult.paths,
                          auxPaths[index],
                        ],
                      });

                      currentPathTimeArray.push([
                        currentPathTimeArray[index][0],
                        this.calculateResultTime(
                          currentPathTimeArray[index][1],
                          paths[pathIndex].duration,
                        ),
                      ]);
                    }
                  });
                },
              );

              result.result.paths_result =
                result.result.paths_result.concat(auxPathResults);

              currentPathTimeAccArray = currentPathTimeAccArray.concat(
                currentPathTimeArray.slice(
                  multipleIndexFound.length,
                  currentPathTimeArray.length,
                ),
              );
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

        lastPathTimeArray = currentPathTimeAccArray;
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

    // console.log(
    //   currentRootPathResults.length,
    //   result.result.paths_result.length,
    // );

    return {
      result: {
        general_info: result.result.general_info,
        paths_result: result.result.paths_result.filter(
          path => path.paths.length === data.length,
        ),
      },
    };
  }
}

export default ManualSearchService;
