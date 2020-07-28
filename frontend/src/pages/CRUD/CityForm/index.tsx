import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useCity, CityOperationsData } from '../../../hooks/modules/city';

import { Container, Content, InputsContainer } from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import SwitchInput from '../../../components/SwitchInput';
import DateRangeInput from '../../../components/DateRangeInput';
import MultiSelect, { Option } from '../../../components/MultiSelect';
import LoadingPartial from '../../../components/Loading/LoadingPartial';
import LoadingPage from '../../../components/Loading/LoadingPage';

import iconCrud from '../../../assets/icon-crud-2.png';
import iconBell from '../../../assets/icon-bell.png';

const CityForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [isBaseCity, setIsBaseCity] = useState(false);
  const [isRelatedCity, setIsRelatedCity] = useState(false);
  const [isInterdicted, setIsInterdicted] = useState(false);

  const [daysFloods, setDayFloods] = useState<Date[]>([]);
  const [selectedRelatedCities, setSelectedRelatedCities] = useState<Option[]>(
    [],
  );
  const [citiesSelect, setCitiesSelect] = useState<Option[]>([]);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { cities, getCities, insertCity } = useCity();

  const handleGetCities = useCallback(async () => {
    setLoadingPartial(true);

    await getCities().then(() => {
      setLoadingPartial(false);
    });
  }, [getCities]);

  useEffect(() => {
    setCitiesSelect(
      cities.map(city => {
        const name =
          city.nome.length > 20
            ? city.nome.substring(0, 20).concat('...')
            : city.nome;
        return {
          value: name,
          label: name,
        };
      }),
    );
  }, [cities]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetCities();
      setIsLoaded(true);
    }
  }, [handleGetCities, isLoaded]);

  const handleCreate = useCallback(
    async (data: CityOperationsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome de usuário obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const cityData: CityOperationsData = {
          cAuditada: isRelatedCity,
          cBase: isBaseCity,
          nome: data.nome,
          latitute: data.latitute,
          longitude: data.longitude,
          obsCidade: data.obsCidade,
          relations: selectedRelatedCities
            .map(relatedCity => relatedCity.value)
            .join(', '),
          obsInterdicao: data.obsInterdicao,
        };

        setLoadingPage(true);

        await insertCity(cityData).then(() => {
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
    [history, insertCity, isBaseCity, isRelatedCity, selectedRelatedCities],
  );

  return (
    <>
      {loadingPartial && <LoadingPartial />}
      {loadingPage && <LoadingPage />}

      <Header isAuthenticated />

      <Menu />

      <Container>
        <Content>
          <img src={iconCrud} alt="Crud" />
          <h1>Cadastro de Cidade</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <strong>Nome da cidade</strong>
              <div>
                <Input name="nome" type="text" />
                <section>
                  <section>
                    <SwitchInput
                      isChecked={isBaseCity}
                      setIsChecked={setIsBaseCity}
                    />
                    <h2>Cidade Base</h2>
                  </section>
                  <section>
                    <SwitchInput
                      isChecked={isRelatedCity}
                      setIsChecked={setIsRelatedCity}
                    />
                    <h2>Cidade Auditada</h2>
                  </section>
                </section>
              </div>

              <nav>
                <strong>Adicionar cidades relacionadas</strong>
                <MultiSelect
                  options={citiesSelect}
                  setSelectedOptions={setSelectedRelatedCities}
                />
              </nav>

              <div>
                <nav>
                  <strong>Latitude</strong>
                  <Input name="latitude" type="number" step="any" />
                </nav>
                <nav>
                  <strong>Longitude</strong>
                  <Input name="longitude" type="number" step="any" />
                </nav>
              </div>

              <strong>Adicionar períodos de cheias de rios</strong>
              <DateRangeInput
                selectedDays={daysFloods}
                setSelectDays={setDayFloods}
              />

              <div>
                <strong>Interdição de trecho</strong>
                <SwitchInput
                  isChecked={isInterdicted}
                  setIsChecked={setIsInterdicted}
                />
                <img src={iconBell} alt="Bell" />
              </div>

              <strong>Observação</strong>
              {isInterdicted ? (
                <Textarea name="obsInterdicao" />
              ) : (
                <Textarea name="obsInterdicao" disabled />
              )}

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
