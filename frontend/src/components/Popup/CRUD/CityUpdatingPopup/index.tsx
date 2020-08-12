import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { isEqual } from 'lodash';

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
  init: string;
  nome: string;
}

const CityUpdatingPopup: React.FC<Props> = ({
  city,
  setCityUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [isNewFlood, setIsNewFlood] = useState(!city.initDataCheia);
  const [positionateFlood, setPositionateFlood] = useState(false);
  const [initFlood, setInitFlood] = useState('');
  const [endFlood, setEndFlood] = useState('');
  const [isBaseCity, setIsBaseCity] = useState(city.cBase);
  const [isAuditatedCity, setIsAuditatedCity] = useState(city.cAuditada);
  const [isInterdicted, setIsInterdicted] = useState(!!city.obsInterdicao);
  const [selectedRelatedCities, setSelectedRelatedCities] = useState<Option[]>(
    () => {
      if (city.relations) {
        return city.relations.split(',').map(relatedCity => {
          return {
            value: relatedCity.trim(),
            label: relatedCity.trim(),
          };
        });
      }
      return [];
    },
  );

  const [citiesSelect, setCitiesSelect] = useState<Option[]>([]);
  const [filteredHolidays, setFilteredHolidays] = useState<FilteredHoliday[]>(
    [],
  );

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { cities, updateCity, removeCity, getCities } = useCity();
  const { holidays, getHolidays } = useHoliday();

  const handleRefreshCities = useCallback(async () => {
    await getCities().then(() => {
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
          nome: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let auxInitFlood = initFlood;
        let auxEndFlood = endFlood;

        if (isNewFlood && !positionateFlood) {
          auxInitFlood = '';
          auxEndFlood = '';
        } else if (!isNewFlood) {
          auxInitFlood = city.initDataCheia ? city.initDataCheia : '';
          auxEndFlood = city.endDataCheia ? city.endDataCheia : '';
        }

        const cityData: CityOperationsData = {
          cAuditada: isAuditatedCity,
          cBase: isBaseCity,
          nome: data.nome,
          latitute: data.latitute,
          longitude: data.longitude,
          relations: selectedRelatedCities
            ? selectedRelatedCities
                .map(relatedCity => relatedCity.value)
                .join(', ')
            : '',
          initDataCheia: auxInitFlood,
          endDataCheia: auxEndFlood,
          obsInterdicao: !isInterdicted ? '' : data.obsInterdicao,
          obsCidade: data.obsCidade,
        };

        const { id, ...auxCity } = city;

        if (!isEqual(cityData, auxCity)) {
          await updateCity(id, cityData).then(() => {
            handleRefreshCities();
          });
        } else {
          setLoadingPartial(false);
          setCityUpdatingPopupActive(false);
        }
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
      endFlood,
      handleRefreshCities,
      initFlood,
      isAuditatedCity,
      isBaseCity,
      isInterdicted,
      isNewFlood,
      positionateFlood,
      selectedRelatedCities,
      setCityUpdatingPopupActive,
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

    await Promise.all([getHolidays(), getCities()]).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities, getHolidays]);

  useEffect(() => {
    setFilteredHolidays(
      holidays
        .filter(holiday => holiday.city_id === city.id)
        .map(cityHoliday => {
          return {
            init: cityHoliday.init,
            nome: cityHoliday.nome,
          };
        }),
    );
  }, [city.id, holidays]);

  useEffect(() => {
    setCitiesSelect(
      cities
        .filter(generalCity => generalCity.nome !== city.nome)
        .map(differentCity => {
          return {
            value: differentCity.nome,
            label: differentCity.nome,
          };
        }),
    );
  }, [cities, city.nome]);

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
                  <Input name="nome" type="text" defaultValue={city.nome} />
                </div>

                <section>
                  <aside>
                    <strong>Cidade base</strong>
                    <SwitchInput
                      isChecked={isBaseCity}
                      setIsChecked={setIsBaseCity}
                    />
                  </aside>
                  <aside>
                    <strong>Cidade auditada</strong>
                    <SwitchInput
                      isChecked={isAuditatedCity}
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
                      name="latitute"
                      type="number"
                      defaultValue={city.latitute}
                    />
                  </nav>

                  <nav>
                    <strong>Longitude</strong>
                    <Input
                      name="longitude"
                      type="number"
                      defaultValue={city.longitude}
                    />
                  </nav>
                </section>

                <strong>Período de cheia</strong>
                {isNewFlood ? (
                  <>
                    <aside>
                      <Input
                        name="initDataCheia"
                        type="text"
                        mask="99/99"
                        onChangeValue={setInitFlood}
                        placeholder="Início"
                      />
                      <img src={IconGo} alt="Go" />
                      <Input
                        name="endDataCheia"
                        type="text"
                        mask="99/99"
                        onChangeValue={setEndFlood}
                        placeholder="Fim"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (initFlood && endFlood) {
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
                          {initFlood.substring(0, 5).concat(' até ')}
                          {endFlood.substring(0, 5)}
                        </h2>
                      </nav>
                    )}
                  </>
                ) : (
                  <>
                    <aside>
                      <Input
                        name="initDataCheia"
                        type="text"
                        disabled
                        isDisabled
                        placeholder="Início"
                      />
                      <img src={IconGo} alt="Go" />
                      <Input
                        name="endDataCheia"
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
                        {city.initDataCheia &&
                          city.initDataCheia.substring(0, 5).concat(' até ')}
                        {city.endDataCheia && city.endDataCheia.substring(0, 5)}
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
                      name="obsInterdicao"
                      type="text"
                      disabled
                      isDisabled
                    />
                  ) : (
                    <Input
                      name="obsInterdicao"
                      type="text"
                      defaultValue={city.obsInterdicao}
                    />
                  )}
                </div>

                <div>
                  <strong>Observação da cidade</strong>
                  <Input
                    name="obsCidade"
                    type="text"
                    defaultValue={city.obsCidade}
                  />
                </div>

                {filteredHolidays.length ? (
                  <div>
                    <section>
                      <strong>Feriados específicos</strong>
                      {filteredHolidays.map(holiday => (
                        <h2 key={holiday.nome}>
                          {holiday.init.substring(0, 5).concat(' - ')}
                          {holiday.nome}
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
