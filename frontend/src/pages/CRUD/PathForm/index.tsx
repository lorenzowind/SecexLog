import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import { usePath, PathOperationsData } from '../../../hooks/modules/path';
import { useModal } from '../../../hooks/modules/modal';
import { useCity } from '../../../hooks/modules/city';
import { useProvider } from '../../../hooks/modules/provider';
import { useToast } from '../../../hooks/toast';

import { Container, Content, InputsContainer } from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import RadioInput from '../../../components/RadioInput';
import LoadingPartial from '../../../components/Loading/LoadingPartial';
import LoadingPage from '../../../components/Loading/LoadingPage';

import iconCrud from '../../../assets/icon-crud-2.png';
import IconGo from '../../../assets/icon-go.png';

interface FilteredProvider {
  nome: string;
  modal: string;
}

const PathForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [categoryPath, setCategoryPath] = useState('');
  const [modalSelected, setModalSelected] = useState('');

  const [arrivalWeekDay, setArrivalWeekDay] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [arrivalWeekDayArray, setArrivalWeekDayArray] = useState<string[]>([]);
  const [arrivalTimeArray, setArrivalTimeArray] = useState<string[]>([]);

  const [modalsSelect, setModalsSelect] = useState<String[]>([]);
  const [citiesSelect, setCitiesSelect] = useState<String[]>([]);
  const [providersSelect, setProvidersSelect] = useState<FilteredProvider[]>(
    [],
  );

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { insertPath } = usePath();
  const { modals, getModals } = useModal();
  const { cities, getCities } = useCity();
  const { providers, getProviders } = useProvider();
  const { addToast } = useToast();

  const handleInsertArrivalPair = useCallback(() => {
    if (arrivalWeekDay && arrivalTime) {
      setArrivalWeekDayArray([...arrivalWeekDayArray, arrivalWeekDay]);
      setArrivalTimeArray([...arrivalTimeArray, arrivalTime]);
    }
  }, [arrivalTime, arrivalTimeArray, arrivalWeekDay, arrivalWeekDayArray]);

  const handleRemoveArrivalPair = useCallback((index: number) => {
    setArrivalWeekDayArray(state =>
      state.filter((_day, curIndex) => curIndex !== index),
    );
    setArrivalTimeArray(state =>
      state.filter((_time, curIndex) => curIndex !== index),
    );
  }, []);

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    await Promise.all([getModals(), getCities(), getProviders()]).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities, getModals, getProviders]);

  useEffect(() => {
    setModalsSelect(modals.map(modal => modal.name));
    setCitiesSelect(cities.map(city => city.nome));
    setProvidersSelect(
      providers.map(provider => {
        return { nome: provider.nome, modal: provider.modal };
      }),
    );
  }, [cities, modals, providers]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetData();
      setIsLoaded(true);
    }
  }, [handleGetData, isLoaded]);

  const handleCreate = useCallback(
    async (data: PathOperationsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          arrival: Yup.string().required('Local de embarque obrigatório'),
          departure: Yup.string().required('Local de embarque obrigatório'),
          duration: Yup.string().required('Duração do trecho obrigatório'),
          cost: Yup.number().required('Valor do trecho obrigatório'),
          mileage: Yup.number().required('Quilometragem obrigatório'),
          prestNome: Yup.string().required('Nome do prestador obrigatório'),
          initCidade: Yup.mixed().test(
            'match',
            'Cidade origem obrigatória',
            () => {
              return data.initCidade !== 'Selecione cidade origem';
            },
          ),
          endCidade: Yup.mixed().test(
            'match',
            'Cidade destino obrigatória',
            () => {
              return data.endCidade !== 'Selecione cidade destino';
            },
          ),
          modal: Yup.mixed().test('match', 'Nome do modal obrigatório', () => {
            return data.modal !== 'Selecione modal';
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!categoryPath || !arrivalWeekDay || !arrivalTime) {
          throw new Error();
        }

        const pathData: PathOperationsData = {
          arrival: data.arrival,
          departure: data.departure,
          contratado: categoryPath === 'Contratado',
          linha: categoryPath === 'Linha',
          cost: data.cost,
          mileage: data.mileage,
          dia: arrivalWeekDayArray.join(', '),
          hora: arrivalTimeArray.join(', '),
          duration: data.duration,
          initCidade: data.initCidade,
          endCidade: data.endCidade,
          modal: data.modal,
          prestNome: data.prestNome,
        };

        setLoadingPage(true);

        await insertPath(pathData).then(() => {
          setLoadingPage(false);
        });

        history.push('/listing-data');
      } catch (err) {
        setLoadingPage(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do trajeto',
        });
      }
    },
    [
      addToast,
      arrivalTime,
      arrivalTimeArray,
      arrivalWeekDay,
      arrivalWeekDayArray,
      categoryPath,
      history,
      insertPath,
    ],
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
          <h1>Cadastro de Trajeto</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <strong>Adicionar cidades do trajeto</strong>
              <Select defaultValue="Selecione cidade origem" name="initCidade">
                <option value="Selecione cidade origem" disabled>
                  Selecione cidade origem
                </option>
                {citiesSelect.map(city => (
                  <option key={`go-${city}`} value={String(city)}>
                    {city}
                  </option>
                ))}
              </Select>

              <img src={IconGo} alt="Go" />

              <Select defaultValue="Selecione cidade destino" name="endCidade">
                <option value="Selecione cidade destino" disabled>
                  Selecione cidade destino
                </option>
                {citiesSelect.map(city => (
                  <option key={`back-${city}`} value={String(city)}>
                    {city}
                  </option>
                ))}
              </Select>

              <strong>Escolha o Modal para este trajeto</strong>
              <Select
                defaultValue="Selecione modal"
                name="preference"
                onChange={e => setModalSelected(e.currentTarget.value)}
              >
                <option value="Selecione modal" disabled>
                  Selecione modal
                </option>
                {modalsSelect.map(modal => (
                  <option key={String(modal)} value={String(modal)}>
                    {modal}
                  </option>
                ))}
              </Select>

              {modalSelected && (
                <>
                  <Select defaultValue="Selecione prestador" name="prestNome">
                    <option value="Selecione prestador" disabled>
                      Selecione prestador
                    </option>
                    {providersSelect
                      .filter(provider => provider.modal === modalSelected)
                      .map(specificProvider => (
                        <option
                          key={String(specificProvider.nome)}
                          value={String(specificProvider.nome)}
                        >
                          {specificProvider.nome}
                        </option>
                      ))}
                  </Select>

                  <strong>Dia e hora de embarque</strong>
                  <Input
                    name="weekDay"
                    type="text"
                    placeholder="Dia"
                    onChangeValue={setArrivalWeekDay}
                  />
                  <Input
                    name="time"
                    type="text"
                    placeholder="Hora"
                    onChangeValue={setArrivalTime}
                  />
                  <button type="button" onClick={handleInsertArrivalPair}>
                    <h3>+</h3>
                  </button>

                  {arrivalWeekDayArray && (
                    <>
                      {arrivalWeekDayArray.map((day, index) => (
                        <div key={String(day)}>
                          <button
                            type="button"
                            onClick={() => handleRemoveArrivalPair(index)}
                          >
                            <h4>X</h4>
                          </button>
                          <h2>{`${day}, ${arrivalTimeArray[index]}`}</h2>
                        </div>
                      ))}
                    </>
                  )}

                  <strong>Duração do trecho</strong>
                  <Input name="duration" type="text" />

                  <strong>Quilometragem (Km)</strong>
                  <Input name="mileage" type="number" step="any" />

                  <strong>Valor do trecho</strong>
                  <Input name="cost" type="number" step="any" />

                  <strong>Local de embarque</strong>
                  <Input name="arrival" type="text" />

                  <strong>Local de desembarque</strong>
                  <Input name="departure" type="text" />

                  <strong>O modal é:</strong>
                  <section>
                    <RadioInput
                      name="category"
                      options={['Linha', 'Contratado']}
                      onChangeValue={setCategoryPath}
                    />
                  </section>
                </>
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

export default PathForm;
