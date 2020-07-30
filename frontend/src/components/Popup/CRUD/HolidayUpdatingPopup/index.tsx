import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { isEqual } from 'lodash';

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

  const [isNewDate, setIsNewDate] = useState(!holiday.init);
  const [positionateDate, setPositionateDate] = useState(false);
  const [initDate, setInitDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [citiesSelect, setCitiesSelect] = useState<String[]>([]);
  const [defaultSelectedCity, setDefaultSelectedCity] = useState('');

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { updateHoliday, removeHoliday, getHolidays } = useHoliday();
  const { cities, getCities } = useCity();

  const handleRefreshHolidays = useCallback(async () => {
    await getHolidays().then(() => {
      setLoadingPartial(false);
      setHolidayUpdatingPopupActive(false);
    });
  }, [getHolidays, setHolidayUpdatingPopupActive]);

  const handleUpdateHoliday = useCallback(
    async (data: HolidayOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        let schema;

        if (isNewDate) {
          if (type === 'Nacional') {
            schema = Yup.object().shape({
              nome: Yup.string().required('Nome obrigatório'),
              init: Yup.string().required('Data de início obrigatória'),
              end: Yup.string().required('Data de término obrigatória'),
            });
          } else {
            schema = Yup.object().shape({
              nome: Yup.string().required('Nome obrigatório'),
              cidade: Yup.mixed().test('match', 'Cidade obrigatória', () => {
                return data.cidade !== 'Selecione uma cidade';
              }),
              init: Yup.string().required('Data de início obrigatória'),
              end: Yup.string().required('Data de término obrigatória'),
            });
          }
        } else if (type === 'Nacional') {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
          });
        } else {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
            cidade: Yup.mixed().test('match', 'Cidade obrigatória', () => {
              return data.cidade !== 'Selecione uma cidade';
            }),
          });
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        let auxInitDate = initDate;
        let auxEndDate = endDate;

        if (isNewDate) {
          auxInitDate = data.init;
          auxEndDate = data.end;
        } else if (!isNewDate) {
          auxInitDate = holiday.init ? holiday.init : '';
          auxEndDate = holiday.end ? holiday.end : '';
        }

        const holidayData: HolidayOperationsData = {
          nome: data.nome,
          national: type === 'Nacional',
          init: auxInitDate,
          end: auxEndDate,
          cidade: type === 'Nacional' ? undefined : data.cidade,
        };

        const { id, ...auxHoliday } = holiday;

        if (!isEqual(holidayData, auxHoliday)) {
          await updateHoliday(id, holidayData).then(() => {
            handleRefreshHolidays();
          });
        } else {
          setLoadingPartial(false);
          setHolidayUpdatingPopupActive(false);
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
      endDate,
      handleRefreshHolidays,
      holiday,
      initDate,
      isNewDate,
      setHolidayUpdatingPopupActive,
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

    await getCities().then(() => {
      setLoadingPartial(false);
    });
  }, [getCities]);

  useEffect(() => {
    setCitiesSelect(cities.map(city => city.nome));

    const foundCity = cities.find(city => city.id === holiday.city_id);

    if (foundCity) {
      setDefaultSelectedCity(foundCity.nome);
    } else {
      setDefaultSelectedCity('Selecione cidade');
    }
  }, [cities, holiday.city_id, type]);

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
                  <Input name="nome" type="text" defaultValue={holiday.nome} />
                </div>

                {type === 'Específico' && (
                  <div>
                    <strong>Cidade</strong>
                    <Select defaultValue="Selecione cidade" name="cidade">
                      <option value="Selecione cidade" disabled>
                        Selecione cidade
                      </option>
                      <option
                        key={String(defaultSelectedCity)}
                        selected
                        value={String(defaultSelectedCity)}
                      >
                        {defaultSelectedCity}
                      </option>
                      {citiesSelect
                        .filter(city => city !== defaultSelectedCity)
                        .map(differentCity => (
                          <option
                            key={String(differentCity)}
                            value={String(differentCity)}
                          >
                            {differentCity}
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
                        name="init"
                        type="text"
                        onChangeValue={setInitDate}
                        placeholder="Início"
                      />
                      <img src={IconGo} alt="Go" />
                      <Input
                        name="end"
                        type="text"
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
                        {holiday.init &&
                          holiday.init.substring(0, 5).concat(' até ')}
                        {holiday.end && holiday.end.substring(0, 5)}
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
