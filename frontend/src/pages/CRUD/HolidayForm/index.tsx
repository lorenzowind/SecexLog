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

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import SwitchInput from '../../../components/SwitchInput';
import DateRangeInput, { RangeState } from '../../../components/DateRangeInput';
import LoadingPartial from '../../../components/Loading/LoadingPartial';
import LoadingPage from '../../../components/Loading/LoadingPage';

import iconCrud from '../../../assets/icon-crud-2.png';

const CityForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [isNational, setIsNational] = useState(false);
  const [rangeHoliday, setRangeHoliday] = useState<RangeState>(
    {} as RangeState,
  );

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

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome de feriado obrigatório'),
          cidade: Yup.mixed().test(
            'match',
            'Nome da cidade obrigatório',
            () => {
              return data.cidade !== 'Selecione cidade';
            },
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (rangeHoliday.from && !rangeHoliday.to) {
          setRangeHoliday({
            from: rangeHoliday.from,
            to: rangeHoliday.from,
          });
        }

        const holidayData: HolidayOperationsData = {
          nome: data.nome,
          cidade: data.cidade,
          national: isNational,
          init: rangeHoliday.from
            ? rangeHoliday.from.toLocaleDateString('pt-BR')
            : '',
          end: rangeHoliday.to
            ? rangeHoliday.to.toLocaleDateString('pt-BR')
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
                  <Select defaultValue="Selecione cidade" name="cidade">
                    <option value="Selecione cidade" disabled>
                      Selecione cidade
                    </option>
                    {citiesSelect.map((city, index) => (
                      <option key={String(index)} value={String(city)}>
                        {city}
                      </option>
                    ))}
                  </Select>

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

export default CityForm;
