import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  useHoliday,
  HolidayOperationsData,
  HolidayState,
} from '../../../../hooks/modules/holiday';
import { useCity } from '../../../../hooks/modules/city';

import Input from '../../../Input';
import Button from '../../../Button';
import Select from '../../../Select';
import LoadingPartial from '../../../Loading/LoadingPartial';

import { Background, FullContainer, Container, Content } from './styles';

import IconClose from '../../../../assets/icon-close.png';
import IconTrash from '../../../../assets/icon-trash.png';
import IconGo from '../../../../assets/icon-go.png';

interface HolidayUpdatingPopupProps {
  type: 'Nacional' | 'Específico';
  holiday: HolidayState;
}

interface Props extends HolidayUpdatingPopupProps {
  setHolidayUpdatingPopupActive(isActive: boolean): void;
}

const HolidayUpdatingPopup: React.FC<Props> = ({
  type,
  holiday,
  setHolidayUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [isNewDate, setIsNewDate] = useState(!holiday.initial_date);
  const [positionateDate, setPositionateDate] = useState(false);
  const [initDate, setInitDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [defaultSelectedCity, setDefaultSelectedCity] = useState('');

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    initializeHolidaysPage,
    updateHoliday,
    removeHoliday,
    getHolidays,
  } = useHoliday();
  const { cities, getCities } = useCity();

  const handleRefreshHolidays = useCallback(async () => {
    await getHolidays('', true).then(() => {
      setLoadingPartial(false);
      initializeHolidaysPage();
      setHolidayUpdatingPopupActive(false);
    });
  }, [getHolidays, setHolidayUpdatingPopupActive, initializeHolidaysPage]);

  const handleUpdateHoliday = useCallback(
    async (data: HolidayOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        let schema;

        if (isNewDate) {
          if (type === 'Nacional') {
            schema = Yup.object().shape({
              name: Yup.string().required('Nome obrigatório'),
              initial_date: Yup.string().required('Data de início obrigatória'),
              end_date: Yup.string().required('Data de término obrigatória'),
            });
          } else {
            schema = Yup.object().shape({
              name: Yup.string().required('Nome obrigatório'),
              city_id: Yup.mixed().test('match', 'Cidade obrigatória', () => {
                return data.city_id !== 'Selecione uma cidade';
              }),
              initial_date: Yup.string().required('Data de início obrigatória'),
              end_date: Yup.string().required('Data de término obrigatória'),
            });
          }
        } else if (type === 'Nacional') {
          schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
          });
        } else {
          schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            city_id: Yup.mixed().test('match', 'Cidade obrigatória', () => {
              return data.city_id !== 'Selecione uma cidade';
            }),
          });
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        let auxInitialDate = initDate;
        let auxEndDate = endDate;

        if (isNewDate) {
          auxInitialDate = data.initial_date;
          auxEndDate = data.end_date;
        } else if (!isNewDate) {
          auxInitialDate = holiday.initial_date ? holiday.initial_date : '';
          auxEndDate = holiday.end_date ? holiday.end_date : '';
        }

        const holidayData: HolidayOperationsData = {
          name: data.name,
          initial_date: auxInitialDate,
          end_date: auxEndDate,
        };

        if (type === 'Específico') {
          Object.assign(holidayData, {
            city_id: cities.find(city => city.name === data.city_id)?.id,
          });
        }

        await updateHoliday(holiday.id, holidayData).then(() => {
          handleRefreshHolidays();
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
      cities,
      endDate,
      handleRefreshHolidays,
      holiday,
      initDate,
      isNewDate,
      type,
      updateHoliday,
    ],
  );

  const handleDeleteHoliday = useCallback(async () => {
    await removeHoliday(holiday.id).then(() => {
      handleRefreshHolidays();
    });
  }, [handleRefreshHolidays, holiday.id, removeHoliday]);

  const handleGetCities = useCallback(async () => {
    setLoadingPartial(true);

    await getCities('', false).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities]);

  useEffect(() => {
    const foundCity = cities.find(city => city.id === holiday.city_id);

    if (foundCity) {
      setDefaultSelectedCity(foundCity.name);
    } else {
      setDefaultSelectedCity('Selecione cidade');
    }
  }, [cities, holiday, type]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetCities();
      setIsLoaded(true);
    }
  }, [handleGetCities, isLoaded]);

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={4} />}

      <Background>
        <FullContainer>
          <Container>
            <Content>
              <button
                type="button"
                onClick={() => setHolidayUpdatingPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <h1>
                Editar Feriado
                {` ${type}`}
              </h1>

              <Form ref={formRef} onSubmit={handleUpdateHoliday}>
                <div>
                  <strong>Nome</strong>
                  <Input name="name" type="text" defaultValue={holiday.name} />
                </div>

                {type === 'Específico' && (
                  <div>
                    <strong>Cidade</strong>
                    <Select
                      value={String(defaultSelectedCity)}
                      name="city_id"
                      onChange={e => setDefaultSelectedCity(e.target.value)}
                    >
                      <option value="Selecione cidade" disabled>
                        Selecione cidade
                      </option>
                      <option
                        key={String(defaultSelectedCity)}
                        value={String(defaultSelectedCity)}
                      >
                        {defaultSelectedCity}
                      </option>
                      {cities
                        .filter(city => city.name !== defaultSelectedCity)
                        .map(differentCity => (
                          <option
                            key={differentCity.id}
                            value={differentCity.name}
                          >
                            {differentCity.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                )}

                <strong>Dia(s)</strong>
                {isNewDate ? (
                  <>
                    <aside>
                      <Input
                        name="initial_date"
                        type="text"
                        mask="99/99"
                        onChangeValue={setInitDate}
                        placeholder="Início"
                      />
                      <img src={IconGo} alt="Go" />
                      <Input
                        name="end_date"
                        type="text"
                        mask="99/99"
                        onChangeValue={setEndDate}
                        placeholder="Término"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (initDate && endDate) {
                            setPositionateDate(true);
                          }
                        }}
                      >
                        <h3>+</h3>
                      </button>
                    </aside>
                    {positionateDate && (
                      <nav>
                        <button
                          type="button"
                          onClick={() => setPositionateDate(false)}
                        >
                          <h4>X</h4>
                        </button>
                        <h2>
                          {initDate.substring(0, 5).concat(' até ')}
                          {endDate.substring(0, 5)}
                        </h2>
                      </nav>
                    )}
                  </>
                ) : (
                  <>
                    <aside>
                      <Input
                        name="init"
                        type="text"
                        disabled
                        isDisabled
                        placeholder="Início"
                      />
                      <img src={IconGo} alt="Go" />
                      <Input
                        name="end"
                        type="text"
                        disabled
                        isDisabled
                        placeholder="Término"
                      />
                      <button type="button">
                        <h3>+</h3>
                      </button>
                    </aside>
                    <nav>
                      <button type="button" onClick={() => setIsNewDate(true)}>
                        <h4>X</h4>
                      </button>
                      <h2>
                        {holiday.initial_date &&
                          holiday.initial_date.substring(0, 5).concat(' até ')}
                        {holiday.end_date && holiday.end_date.substring(0, 5)}
                      </h2>
                    </nav>
                  </>
                )}

                <section>
                  <button type="button" onClick={handleDeleteHoliday}>
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

export default HolidayUpdatingPopup;
