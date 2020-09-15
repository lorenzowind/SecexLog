import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  useCity,
  CityOperationsData,
  CityState,
} from '../../../../hooks/modules/city';
import { useHoliday } from '../../../../hooks/modules/holiday';

import Input from '../../../Input';
import Button from '../../../Button';
import SwitchInput from '../../../SwitchInput';
import MultiSelect, { Option } from '../../../MultiSelect';
import LoadingPartial from '../../../Loading/LoadingPartial';

import { Background, FullContainer, Container, Content } from './styles';

import IconClose from '../../../../assets/icon-close.png';
import IconTrash from '../../../../assets/icon-trash.png';
import IconGo from '../../../../assets/icon-go.png';

interface CityUpdatingPopupProps {
  city: CityState;
}

interface Props extends CityUpdatingPopupProps {
  setCityUpdatingPopupActive(isActive: boolean): void;
}

interface FilteredHoliday {
  initial_date: string;
  name: string;
}

const CityUpdatingPopup: React.FC<Props> = ({
  city,
  setCityUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [isNewFlood, setIsNewFlood] = useState(!city.initial_flood_date);
  const [positionateFlood, setPositionateFlood] = useState(false);
  const [initialFloodDate, setInitialFloodDate] = useState('');
  const [endFloodDate, setEndFloodDate] = useState('');
  const [isBaseCity, setIsBaseCity] = useState(city.is_base);
  const [isAuditatedCity, setIsAuditatedCity] = useState(city.is_auditated);
  const [isInterdicted, setIsInterdicted] = useState(!!city.city_observation);
  const [selectedRelatedCities, setSelectedRelatedCities] = useState<Option[]>(
    [],
  );
  const [citiesSelect, setCitiesSelect] = useState<Option[]>([]);
  const [filteredHolidays, setFilteredHolidays] = useState<FilteredHoliday[]>(
    [],
  );

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    cities,
    relatedCities,
    updateCity,
    removeCity,
    getCities,
    getRelatedCities,
  } = useCity();
  const { holidays, getHolidays } = useHoliday();

  const handleRefreshCities = useCallback(async () => {
    await getCities(true).then(() => {
      setLoadingPartial(false);
      setCityUpdatingPopupActive(false);
    });
  }, [getCities, setCityUpdatingPopupActive]);

  const handleUpdateCity = useCallback(
    async (data: CityOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let auxInitialFloodDate = initialFloodDate;
        let auxEndFloodDate = endFloodDate;

        if (isNewFlood && !positionateFlood) {
          auxInitialFloodDate = '';
          auxEndFloodDate = '';
        } else if (!isNewFlood) {
          auxInitialFloodDate = city.initial_flood_date
            ? city.initial_flood_date
            : '';
          auxEndFloodDate = city.end_flood_date ? city.end_flood_date : '';
        }

        const cityData: CityOperationsData = {
          name: data.name,
          is_auditated: isAuditatedCity,
          is_base: isBaseCity,
          city_observation: data.city_observation,
          interdiction_observation: isInterdicted
            ? data.interdiction_observation
            : '',
          initial_flood_date: auxInitialFloodDate,
          end_flood_date: auxEndFloodDate,
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          related_cities: selectedRelatedCities.map(relatedCity => {
            return {
              related_city_id: relatedCity.value,
            };
          }),
        };

        await updateCity(city.id, cityData).then(() => {
          handleRefreshCities();
        });
      } catch (err) {
        setLoadingPartial(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [
      city,
      endFloodDate,
      handleRefreshCities,
      initialFloodDate,
      isAuditatedCity,
      isBaseCity,
      isInterdicted,
      isNewFlood,
      positionateFlood,
      selectedRelatedCities,
      updateCity,
    ],
  );

  const handleDeleteCity = useCallback(async () => {
    await removeCity(city.id).then(() => {
      handleRefreshCities();
    });
  }, [city.id, handleRefreshCities, removeCity]);

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    await Promise.all([
      getHolidays(false),
      getCities(false),
      getRelatedCities(city.id),
    ]).then(() => {
      setLoadingPartial(false);
    });
  }, [city.id, getCities, getHolidays, getRelatedCities]);

  useEffect(() => {
    setFilteredHolidays(
      holidays
        .filter(holiday => holiday.city_id === city.id)
        .map(cityHoliday => {
          return {
            initial_date: cityHoliday.initial_date,
            name: cityHoliday.name,
          };
        }),
    );
  }, [city.id, holidays]);

  useEffect(() => {
    setCitiesSelect(
      cities
        .filter(generalCity => generalCity.name !== city.name)
        .map(differentCity => {
          return {
            value: differentCity.id,
            label: differentCity.name,
          };
        }),
    );
  }, [cities, city.name]);

  useEffect(() => {
    setSelectedRelatedCities(
      relatedCities.reduce(
        (newSelectedRelatedCities: Option[], relatedCityId) => {
          const relatedCity = cities.find(
            findCity => findCity.id === relatedCityId.related_city_id,
          );

          if (relatedCity) {
            newSelectedRelatedCities.push({
              value: relatedCity.id,
              label: relatedCity.name,
            });
          }
          return newSelectedRelatedCities;
        },
        [],
      ),
    );
  }, [cities, relatedCities]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetData();
      setIsLoaded(true);
    }
  }, [handleGetData, isLoaded]);

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={4} />}

      <Background>
        <FullContainer>
          <Container>
            <Content>
              <button
                type="button"
                onClick={() => setCityUpdatingPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <h1>Editar Cidade</h1>

              <Form ref={formRef} onSubmit={handleUpdateCity}>
                <div>
                  <strong>Nome</strong>
                  <Input name="name" type="text" defaultValue={city.name} />
                </div>

                <section>
                  <aside>
                    <strong>Cidade base</strong>
                    <SwitchInput
                      isChecked={!!isBaseCity}
                      setIsChecked={setIsBaseCity}
                    />
                  </aside>
                  <aside>
                    <strong>Cidade auditada</strong>
                    <SwitchInput
                      isChecked={!!isAuditatedCity}
                      setIsChecked={setIsAuditatedCity}
                    />
                  </aside>
                </section>

                <div>
                  <strong>Cidades relacionadas</strong>
                  <MultiSelect
                    placeholder="Selecione"
                    setSelectedOptions={setSelectedRelatedCities}
                    defaultValues={selectedRelatedCities}
                    options={citiesSelect}
                  />
                </div>

                <section>
                  <nav>
                    <strong>Latitude</strong>
                    <Input
                      name="latitude"
                      type="number"
                      defaultValue={city.latitude || ''}
                    />
                  </nav>

                  <nav>
                    <strong>Longitude</strong>
                    <Input
                      name="longitude"
                      type="number"
                      defaultValue={city.longitude || ''}
                    />
                  </nav>
                </section>

                <strong>Período de cheia</strong>
                {isNewFlood ? (
                  <>
                    <aside>
                      <Input
                        name="initial_flood_date"
                        type="text"
                        mask="99/99"
                        onChangeValue={setInitialFloodDate}
                        placeholder="Início"
                      />
                      <img src={IconGo} alt="Go" />
                      <Input
                        name="end_flood_date"
                        type="text"
                        mask="99/99"
                        onChangeValue={setEndFloodDate}
                        placeholder="Fim"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (initialFloodDate && endFloodDate) {
                            setPositionateFlood(true);
                          }
                        }}
                      >
                        <h3>+</h3>
                      </button>
                    </aside>
                    {positionateFlood && (
                      <nav>
                        <button
                          type="button"
                          onClick={() => setPositionateFlood(false)}
                        >
                          <h4>X</h4>
                        </button>
                        <h2>
                          {initialFloodDate.substring(0, 5).concat(' até ')}
                          {endFloodDate.substring(0, 5)}
                        </h2>
                      </nav>
                    )}
                  </>
                ) : (
                  <>
                    <aside>
                      <Input
                        name="initialFloodDate"
                        type="text"
                        disabled
                        isDisabled
                        placeholder="Início"
                      />
                      <img src={IconGo} alt="Go" />
                      <Input
                        name="endFloodDate"
                        type="text"
                        disabled
                        isDisabled
                        placeholder="Fim"
                      />
                      <button type="button">
                        <h3>+</h3>
                      </button>
                    </aside>
                    <nav>
                      <button type="button" onClick={() => setIsNewFlood(true)}>
                        <h4>X</h4>
                      </button>
                      <h2>
                        {city.initial_flood_date &&
                          city.initial_flood_date
                            .substring(0, 5)
                            .concat(' até ')}
                        {city.end_flood_date &&
                          city.end_flood_date.substring(0, 5)}
                      </h2>
                    </nav>
                  </>
                )}

                <section>
                  <aside>
                    <strong>Cidade interditada</strong>
                    <SwitchInput
                      isChecked={isInterdicted}
                      setIsChecked={setIsInterdicted}
                    />
                  </aside>
                </section>
                <div>
                  {!isInterdicted ? (
                    <Input
                      name="interdiction_observation"
                      type="text"
                      disabled
                      isDisabled
                    />
                  ) : (
                    <Input
                      name="interdiction_observation"
                      type="text"
                      defaultValue={city.interdiction_observation}
                    />
                  )}
                </div>

                <div>
                  <strong>Observação da cidade</strong>
                  <Input
                    name="city_observation"
                    type="text"
                    defaultValue={city.city_observation}
                  />
                </div>

                {filteredHolidays.length ? (
                  <div>
                    <section>
                      <strong>Feriados específicos</strong>
                      {filteredHolidays.map(holiday => (
                        <h2 key={holiday.name}>
                          {holiday.initial_date.substring(0, 5).concat(' - ')}
                          {holiday.name}
                        </h2>
                      ))}
                    </section>
                  </div>
                ) : null}

                <section>
                  <button type="button" onClick={handleDeleteCity}>
                    <img src={IconTrash} alt="Trash" />
                  </button>

                  <Button type="submit">Salvar</Button>
                </section>
              </Form>
            </Content>
          </Container>
        </FullContainer>
      </Background>
    </>
  );
};

export default CityUpdatingPopup;
