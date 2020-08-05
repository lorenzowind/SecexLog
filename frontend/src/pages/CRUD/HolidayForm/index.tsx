import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import {
  useHoliday,
  HolidayOperationsData,
} from '../../../hooks/modules/holiday';
import { useCity } from '../../../hooks/modules/city';

import { Container, Content, InputsContainer } from './styles';

import {
  Header,
  Menu,
  Input,
  Button,
  Select,
  SwitchInput,
  LoadingPartial,
  LoadingPage,
} from '../../../components';

import DateRangeInput, { RangeState } from '../../../components/DateRangeInput';

import iconCrud from '../../../assets/icon-crud-2.png';

const HolidayForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [isNational, setIsNational] = useState(false);
  const [rangeHoliday, setRangeHoliday] = useState<RangeState>(
    {} as RangeState,
  );

  const [citySelected, setCitySelected] = useState('Selecione cidade');

  const [citiesSelect, setCitiesSelect] = useState<String[]>([]);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { insertHoliday } = useHoliday();
  const { cities, getCities } = useCity();

  const handleGetCities = useCallback(async () => {
    setLoadingPartial(true);

    await getCities().then(() => {
      setLoadingPartial(false);
    });
  }, [getCities]);

  useEffect(() => {
    setCitiesSelect(cities.map(city => city.nome));
  }, [cities]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetCities();
      setIsLoaded(true);
    }
  }, [handleGetCities, isLoaded]);

  const handleCreate = useCallback(
    async (data: HolidayOperationsData) => {
      try {
        formRef.current?.setErrors({});

        let schema;

        if (!isNational) {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome de feriado obrigatório'),
            cidade: Yup.mixed().test(
              'match',
              'Nome da cidade obrigatório',
              () => {
                return data.cidade !== 'Selecione cidade';
              },
            ),
          });
        } else {
          schema = Yup.object().shape({
            nome: Yup.string().required('Nome de feriado obrigatório'),
          });
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const auxRangeHoliday = rangeHoliday;

        if (auxRangeHoliday.from && !auxRangeHoliday.to) {
          auxRangeHoliday.to = auxRangeHoliday.from;
        }

        const holidayData: HolidayOperationsData = {
          nome: data.nome,
          cidade: !isNational ? data.cidade : '',
          national: isNational,
          init: auxRangeHoliday.from
            ? auxRangeHoliday.from.toLocaleDateString('pt-BR')
            : '',
          end: auxRangeHoliday.to
            ? auxRangeHoliday.to.toLocaleDateString('pt-BR')
            : '',
        };

        setLoadingPage(true);

        await insertHoliday(holidayData).then(() => {
          setLoadingPage(false);
        });

        history.push('/listing-data');
      } catch (err) {
        setLoadingPage(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history, insertHoliday, isNational, rangeHoliday],
  );

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={1} />}
      {loadingPage && <LoadingPage />}

      <Header isAuthenticated />

      <Menu />

      <Container>
        <Content>
          <img src={iconCrud} alt="Crud" />
          <h1>Cadastro de Feriado</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <section>
                <strong>Nome do Feriado</strong>
                <Input name="nome" type="text" />

                <strong>Nome da Cidade</strong>
                <div>
                  {!isNational ? (
                    <Select
                      name="cidade"
                      value={citySelected}
                      onChange={e => setCitySelected(e.target.value)}
                    >
                      <option value="Selecione cidade" disabled>
                        Selecione cidade
                      </option>
                      {citiesSelect.map((city, index) => (
                        <option key={String(index)} value={String(city)}>
                          {city}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Select
                      name="cidade"
                      value={citySelected}
                      onChange={e => setCitySelected(e.target.value)}
                      disabled
                    >
                      <option value="Selecione cidade" disabled>
                        Selecione cidade
                      </option>
                      {citiesSelect.map((city, index) => (
                        <option key={String(index)} value={String(city)}>
                          {city}
                        </option>
                      ))}
                    </Select>
                  )}

                  <nav>
                    <SwitchInput
                      isChecked={isNational}
                      setIsChecked={setIsNational}
                    />
                    <strong>Nacional</strong>
                  </nav>
                </div>
              </section>

              <strong>Selecionar Período</strong>
              <DateRangeInput
                rangeDays={rangeHoliday}
                setRangeDays={setRangeHoliday}
              />

              <aside>
                <Button type="submit">Criar</Button>
              </aside>
            </Form>
          </InputsContainer>
        </Content>
      </Container>
    </>
  );
};

export default HolidayForm;
