import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  usePath,
  PathOperationsData,
  PathState,
} from '../../../../hooks/modules/path';
import { useCity } from '../../../../hooks/modules/city';
import { useModal } from '../../../../hooks/modules/modal';
import { useProvider } from '../../../../hooks/modules/provider';

import Input from '../../../Input';
import Button from '../../../Button';
import Select from '../../../Select';
import RadioInput from '../../../RadioInput';
import LoadingPartial from '../../../Loading/LoadingPartial';

import { Background, FullContainer, Container, Content } from './styles';

import IconClose from '../../../../assets/icon-close.png';
import IconTrash from '../../../../assets/icon-trash.png';
import IconGo from '../../../../assets/icon-go.png';

interface PathUpdatingPopupProps {
  path: PathState;
}

interface Props extends PathUpdatingPopupProps {
  setPathUpdatingPopupActive(isActive: boolean): void;
}

interface FilteredProvider {
  id: string;
  modal_id: string;
}

const PathUpdatingPopup: React.FC<Props> = ({
  path,
  setPathUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [categoryPath, setCategoryPath] = useState(
    path.is_hired ? 'Contratado' : 'Linha',
  );

  const [arrivalWeekDay, setArrivalWeekDay] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [arrivalWeekDayArray, setArrivalWeekDayArray] = useState<string[]>(
    path.boarding_days.split(', '),
  );
  const [arrivalTimeArray, setArrivalTimeArray] = useState<string[]>(
    path.boarding_times.split(', '),
  );

  const [defaultSelectedGoCity, setDefaultSelectedGoCity] = useState('');
  const [defaultSelectedBackCity, setDefaultSelectedBackCity] = useState('');
  const [defaultSelectedModal, setDefaultSelectedModal] = useState('');
  const [defaultSelectedProvider, setDefaultSelectedProvider] = useState<
    FilteredProvider
  >({} as FilteredProvider);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { initializePathsPage, updatePath, removePath, getPaths } = usePath();
  const { modals, getModals } = useModal();
  const { cities, getCities } = useCity();
  const { providers, getProviders } = useProvider();

  const handleRefreshPaths = useCallback(async () => {
    initializePathsPage();

    await getPaths('', true).then(() => {
      setLoadingPartial(false);
      setPathUpdatingPopupActive(false);
    });
  }, [getPaths, setPathUpdatingPopupActive, initializePathsPage]);

  const handleUpdatePath = useCallback(
    async (data: PathOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          boarding_place: Yup.string().required(
            'Local de embarque obrigatório',
          ),
          departure_place: Yup.string().required(
            'Local de embarque obrigatório',
          ),
          duration: Yup.string().required('Duração do trecho obrigatório'),
          mileage: Yup.number().required('Quilometragem obrigatório'),
          cost: Yup.number().required('Valor do trecho obrigatório'),
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

        await updatePath(path.id, pathData).then(() => {
          handleRefreshPaths();
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
      arrivalTimeArray,
      arrivalWeekDayArray,
      categoryPath,
      handleRefreshPaths,
      path.id,
      updatePath,
    ],
  );

  const handleDeletePath = useCallback(async () => {
    await removePath(path.id).then(() => {
      handleRefreshPaths();
    });
  }, [handleRefreshPaths, path.id, removePath]);

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

    await Promise.all([
      getModals('', false),
      getCities('', false),
      getProviders('', false),
    ]).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities, getModals, getProviders]);

  useEffect(() => {
    setDefaultSelectedGoCity(path.origin_city_id);
    setDefaultSelectedBackCity(path.destination_city_id);
    setDefaultSelectedModal(path.modal_id);
    setDefaultSelectedProvider({
      modal_id: path.modal_id,
      id: path.provider_id,
    });
  }, [cities, modals, path, providers]);

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
                onClick={() => setPathUpdatingPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <h1>Editar Trajeto</h1>

              <Form ref={formRef} onSubmit={handleUpdatePath}>
                <strong>Cidades</strong>
                <nav>
                  <div>
                    <Select
                      name="origin_city_id"
                      value={defaultSelectedGoCity}
                      onChange={e => setDefaultSelectedGoCity(e.target.value)}
                    >
                      <option value="Selecione cidade origem" disabled>
                        Selecione cidade origem
                      </option>
                      {cities.map(differentCity => (
                        <option key={differentCity.id} value={differentCity.id}>
                          {differentCity.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <img src={IconGo} alt="Go" />

                  <div>
                    <Select
                      name="destination_city_id"
                      value={defaultSelectedBackCity}
                      onChange={e => setDefaultSelectedBackCity(e.target.value)}
                    >
                      <option value="Selecione cidade destino" disabled>
                        Selecione cidade destino
                      </option>
                      {cities.map(differentCity => (
                        <option key={differentCity.id} value={differentCity.id}>
                          {differentCity.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </nav>

                <nav>
                  <div>
                    <strong>Modal</strong>
                    <Select
                      name="modal_id"
                      value={defaultSelectedModal}
                      onChange={e =>
                        setDefaultSelectedModal(e.currentTarget.value)
                      }
                    >
                      <option value="Selecione modal" disabled>
                        Selecione modal
                      </option>
                      {modals.map(differentModal => (
                        <option
                          key={differentModal.id}
                          value={differentModal.id}
                        >
                          {differentModal.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <strong>Nome do Prestador</strong>
                    <Select
                      name="provider_id"
                      value={defaultSelectedProvider.id}
                      onChange={e =>
                        setDefaultSelectedProvider({
                          id: e.target.value,
                          modal_id: defaultSelectedProvider.modal_id,
                        })
                      }
                    >
                      <option value="Selecione prestador" disabled>
                        Selecione prestador
                      </option>
                      {providers
                        .filter(
                          differentProvider =>
                            differentProvider.modal_id === defaultSelectedModal,
                        )
                        .map(specificProvider => (
                          <option
                            key={specificProvider.id}
                            value={specificProvider.id}
                          >
                            {specificProvider.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                </nav>

                <strong>Dia e hora de embarque</strong>
                <aside>
                  <div>
                    <Select
                      defaultValue="Selecione dia"
                      name="weekDay"
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
                  </div>
                  <div>
                    <Input
                      name="time"
                      type="time"
                      onChangeValue={setArrivalTime}
                    />
                  </div>
                  <button type="button" onClick={handleInsertArrivalPair}>
                    <h3>+</h3>
                  </button>
                </aside>

                <div>
                  {arrivalWeekDayArray && (
                    <section>
                      {arrivalWeekDayArray.map((day, index) => (
                        <article key={`${index} - ${String(day)}`}>
                          <button
                            type="button"
                            onClick={() => handleRemoveArrivalPair(index)}
                          >
                            <h4>X</h4>
                          </button>
                          <h2>{`${day}, ${arrivalTimeArray[index]}`}</h2>
                        </article>
                      ))}
                    </section>
                  )}
                </div>

                <section>
                  <div>
                    <strong>Duração</strong>
                    <Input
                      name="duration"
                      type="time"
                      defaultValue={path.duration}
                    />
                  </div>

                  <div>
                    <strong>Distância</strong>
                    <Input
                      name="mileage"
                      type="number"
                      step="any"
                      placeholder="Km"
                      defaultValue={path.mileage}
                    />
                  </div>
                  <div>
                    <strong>Valor</strong>
                    <Input
                      name="cost"
                      type="number"
                      step="any"
                      placeholder="R$"
                      defaultValue={path.cost}
                    />
                  </div>
                </section>

                <nav>
                  <div>
                    <strong>Embarque</strong>
                    <Input
                      name="boarding_place"
                      type="text"
                      defaultValue={path.boarding_place}
                    />
                  </div>

                  <div>
                    <strong>Desembarque</strong>
                    <Input
                      name="departure_place"
                      type="text"
                      defaultValue={path.departure_place}
                    />
                  </div>
                </nav>

                <footer>
                  <strong>O modal é:</strong>
                  <RadioInput
                    name="category"
                    options={['Linha', 'Contratado']}
                    onChangeValue={setCategoryPath}
                    defaultValue={path.is_hired ? 'Contratado' : 'Linha'}
                  />
                </footer>

                <section>
                  <button type="button" onClick={handleDeletePath}>
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

export default PathUpdatingPopup;
