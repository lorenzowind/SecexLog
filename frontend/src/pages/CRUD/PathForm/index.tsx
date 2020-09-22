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

import {
  Header,
  Menu,
  Input,
  Button,
  Select,
  RadioInput,
  LoadingPartial,
  LoadingPage,
} from '../../../components';

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

  const [modalSelected, setModalSelected] = useState('Selecione modal');
  const [cityGoSelected, setCityGoSelected] = useState(
    'Selecione cidade origem',
  );
  const [cityBackSelected, setCityBackSelected] = useState(
    'Selecione cidade destino',
  );
  const [providerSelected, setProviderSelected] = useState(
    'Selecione prestador',
  );

  const [arrivalWeekDay, setArrivalWeekDay] = useState('Selecione dia');
  const [arrivalTime, setArrivalTime] = useState('');
  const [arrivalWeekDayArray, setArrivalWeekDayArray] = useState<string[]>([]);
  const [arrivalTimeArray, setArrivalTimeArray] = useState<string[]>([]);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { insertPath } = usePath();
  const { modals, getModals } = useModal();
  const { cities, getCities } = useCity();
  const { providers, getProviders } = useProvider();
  const { addToast } = useToast();

  const handleInsertArrivalPair = useCallback(() => {
    if (arrivalWeekDay && arrivalTime && arrivalWeekDay !== 'Selecione dia') {
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

    await Promise.all([getModals(''), getCities(''), getProviders('')]).then(
      () => {
        setLoadingPartial(false);
      },
    );
  }, [getCities, getModals, getProviders]);

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
          boarding_place: Yup.string().required(
            'Local de embarque obrigatório',
          ),
          departure_place: Yup.string().required(
            'Local de embarque obrigatório',
          ),
          duration: Yup.string().required('Duração do trecho obrigatório'),
          cost: Yup.number().required('Valor do trecho obrigatório'),
          mileage: Yup.number().required('Quilometragem obrigatório'),
          provider_id: Yup.mixed().test(
            'match',
            'Nome do prestador obrigatório',
            () => {
              return data.provider_id !== 'Selecione prestador';
            },
          ),
          origin_city_id: Yup.mixed().test(
            'match',
            'Cidade origem obrigatória',
            () => {
              return data.origin_city_id !== 'Selecione cidade origem';
            },
          ),
          destination_city_id: Yup.mixed().test(
            'match',
            'Cidade destino obrigatória',
            () => {
              return data.destination_city_id !== 'Selecione cidade destino';
            },
          ),
          modal_id: Yup.mixed().test(
            'match',
            'Nome do modal obrigatório',
            () => {
              return data.modal_id !== 'Selecione modal';
            },
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!categoryPath || !arrivalWeekDayArray || !arrivalTimeArray) {
          throw new Error();
        }

        const pathData: PathOperationsData = {
          boarding_place: data.boarding_place,
          departure_place: data.departure_place,
          is_hired: categoryPath === 'Contratado',
          duration:
            typeof data.duration === 'string'
              ? Number(data.duration.split(':')[0]) * 60 +
                Number(data.duration.split(':')[1])
              : 0,
          mileage: Number(data.mileage),
          cost: Number(data.cost),
          boarding_days: arrivalWeekDayArray.join(', '),
          boarding_times: arrivalTimeArray.join(', '),
          origin_city_id: data.origin_city_id,
          destination_city_id: data.destination_city_id,
          modal_id: data.modal_id,
          provider_id: data.provider_id,
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
      arrivalTimeArray,
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

      <Menu isAuthenticated />

      <Container>
        <Content>
          <img src={iconCrud} alt="Crud" />
          <h1>Cadastro de Trajeto</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <div>
                <strong>Adicionar cidades do trajeto</strong>
                <section>
                  <Select
                    name="origin_city_id"
                    value={cityGoSelected}
                    onChange={e => setCityGoSelected(e.target.value)}
                  >
                    <option value="Selecione cidade origem" disabled>
                      Selecione cidade origem
                    </option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Select>

                  <img src={IconGo} alt="Go" />

                  <Select
                    name="destination_city_id"
                    value={cityBackSelected}
                    onChange={e => setCityBackSelected(e.target.value)}
                  >
                    <option value="Selecione cidade destino" disabled>
                      Selecione cidade destino
                    </option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                </section>
              </div>

              <nav>
                <strong>Escolha o Modal para este trajeto</strong>
                <Select
                  name="modal_id"
                  value={modalSelected}
                  onChange={e => setModalSelected(e.currentTarget.value)}
                >
                  <option value="Selecione modal" disabled>
                    Selecione modal
                  </option>
                  {modals.map(modal => (
                    <option key={modal.id} value={modal.id}>
                      {modal.name}
                    </option>
                  ))}
                </Select>
              </nav>

              <nav>
                <strong>Selecione o Prestador deste Trajeto</strong>
                <Select
                  name="provider_id"
                  value={providerSelected}
                  onChange={e => setProviderSelected(e.target.value)}
                >
                  <option value="Selecione prestador" disabled>
                    Selecione prestador
                  </option>
                  {providers
                    .filter(provider => provider.modal_id === modalSelected)
                    .map(specificProvider => (
                      <option
                        key={specificProvider.id}
                        value={specificProvider.id}
                      >
                        {specificProvider.name}
                      </option>
                    ))}
                </Select>
              </nav>

              <div>
                <strong>Dia e hora de embarque</strong>
                <aside>
                  <Select
                    name="weekDay"
                    value={arrivalWeekDay}
                    onChange={e => setArrivalWeekDay(e.currentTarget.value)}
                  >
                    <option value="Selecione dia" disabled>
                      Selecione dia
                    </option>
                    <option value="Segunda-feira">Segunda-feira</option>
                    <option value="Terça-feira">Terça-feira</option>
                    <option value="Quarta-feira">Quarta-feira</option>
                    <option value="Quinta-feira">Quinta-feira</option>
                    <option value="Sexta-feira">Sexta-feira</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                  </Select>
                  <Input
                    name="time"
                    type="time"
                    onChangeValue={setArrivalTime}
                  />
                  <button type="button" onClick={handleInsertArrivalPair}>
                    <h3>+</h3>
                  </button>
                </aside>
                <nav>
                  {arrivalWeekDayArray && (
                    <>
                      {arrivalWeekDayArray.map((day, index) => (
                        <nav key={String(index)}>
                          <button
                            type="button"
                            onClick={() => handleRemoveArrivalPair(index)}
                          >
                            <h4>X</h4>
                          </button>
                          <h2>{`${day}, ${arrivalTimeArray[index]}`}</h2>
                        </nav>
                      ))}
                    </>
                  )}
                </nav>
              </div>

              <section>
                <nav>
                  <strong>Duração do trecho</strong>
                  <Input name="duration" type="time" />
                </nav>

                <nav>
                  <strong>Distância</strong>
                  <Input
                    name="mileage"
                    type="number"
                    step="any"
                    placeholder="Km"
                  />
                </nav>

                <nav>
                  <strong>Valor do trecho</strong>
                  <Input
                    name="cost"
                    type="number"
                    step="any"
                    placeholder="R$"
                  />
                </nav>
              </section>

              <div>
                <strong>Local de embarque</strong>
                <Input name="boarding_place" type="text" />
              </div>

              <div>
                <strong>Local de desembarque</strong>
                <Input name="departure_place" type="text" />
              </div>

              <div>
                <strong>O modal é:</strong>
                <section>
                  <RadioInput
                    name="category"
                    options={['Linha', 'Contratado']}
                    onChangeValue={setCategoryPath}
                  />
                </section>
              </div>

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
