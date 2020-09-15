import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { isEqual } from 'lodash';

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
  nome: string;
  modal: string;
}

const PathUpdatingPopup: React.FC<Props> = ({
  path,
  setPathUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [categoryPath, setCategoryPath] = useState(
    path.linha ? 'Linha' : 'Contratado',
  );

  const [arrivalWeekDay, setArrivalWeekDay] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [arrivalWeekDayArray, setArrivalWeekDayArray] = useState<string[]>(
    path.dia,
  );
  const [arrivalTimeArray, setArrivalTimeArray] = useState<string[]>(path.hora);

  const [defaultSelectedGoCity, setDefaultSelectedGoCity] = useState('');
  const [defaultSelectedBackCity, setDefaultSelectedBackCity] = useState('');
  const [defaultSelectedModal, setDefaultSelectedModal] = useState('');
  const [defaultSelectedProvider, setDefaultSelectedProvider] = useState<
    FilteredProvider
  >({} as FilteredProvider);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { updatePath, removePath, getPaths } = usePath();
  const { modals, getModals } = useModal();
  const { cities, getCities } = useCity();
  const { providers, getProviders } = useProvider();

  const handleRefreshPaths = useCallback(async () => {
    await getPaths().then(() => {
      setLoadingPartial(false);
      setPathUpdatingPopupActive(false);
    });
  }, [getPaths, setPathUpdatingPopupActive]);

  const handleUpdatePath = useCallback(
    async (data: PathOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          arrival: Yup.string().required('Local de embarque obrigatório'),
          departure: Yup.string().required('Local de embarque obrigatório'),
          duration: Yup.string().required('Duração do trecho obrigatório'),
          cost: Yup.number().required('Valor do trecho obrigatório'),
          mileage: Yup.number().required('Quilometragem obrigatório'),
          prestNome: Yup.mixed().test(
            'match',
            'Nome do prestador obrigatório',
            () => {
              return data.prestNome !== 'Selecione prestador';
            },
          ),
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

        if (!categoryPath || !arrivalWeekDayArray || !arrivalTimeArray) {
          throw new Error();
        }

        const pathData: PathOperationsData = {
          arrival: data.arrival,
          departure: data.departure,
          contratado: categoryPath === 'Contratado',
          linha: categoryPath === 'Linha',
          cost: Number(data.cost),
          mileage: Number(data.mileage),
          dia: arrivalWeekDayArray,
          hora: arrivalTimeArray,
          duration: data.duration,
          initCidade: data.initCidade,
          endCidade: data.endCidade,
          modal: data.modal,
          prestNome: data.prestNome,
        };

        const { id, ...auxPath } = path;

        if (!isEqual(pathData, auxPath)) {
          await updatePath(id, pathData).then(() => {
            handleRefreshPaths();
          });
        } else {
          setLoadingPartial(false);
          setPathUpdatingPopupActive(false);
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
      arrivalTimeArray,
      arrivalWeekDayArray,
      categoryPath,
      handleRefreshPaths,
      path,
      setPathUpdatingPopupActive,
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
      getModals(false),
      getCities(false),
      getProviders(false),
    ]).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities, getModals, getProviders]);

  useEffect(() => {
    setDefaultSelectedGoCity(path.initCidade);
    setDefaultSelectedBackCity(path.endCidade);
    setDefaultSelectedModal(path.modal);
    setDefaultSelectedProvider({
      modal: path.modal,
      nome: path.prestNome,
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
                  {/* <div>
                    <Select
                      name="initCidade"
                      value={String(defaultSelectedGoCity)}
                      onChange={e => setDefaultSelectedGoCity(e.target.value)}
                    >
                      <option value="Selecione cidade origem" disabled>
                        Selecione cidade origem
                      </option>
                      <option
                        key={String(defaultSelectedGoCity)}
                        value={String(defaultSelectedGoCity)}
                      >
                        {defaultSelectedGoCity}
                      </option>
                      {citiesSelect
                        .filter(city => city !== defaultSelectedGoCity)
                        .map(differentCity => (
                          <option
                            key={`go-${differentCity}`}
                            value={String(differentCity)}
                          >
                            {differentCity}
                          </option>
                        ))}
                    </Select>
                  </div>

                  <img src={IconGo} alt="Go" />

                  <div>
                    <Select
                      name="endCidade"
                      value={String(defaultSelectedBackCity)}
                      onChange={e => setDefaultSelectedBackCity(e.target.value)}
                    >
                      <option value="Selecione cidade destino" disabled>
                        Selecione cidade destino
                      </option>
                      <option
                        key={String(defaultSelectedBackCity)}
                        value={String(defaultSelectedBackCity)}
                      >
                        {defaultSelectedBackCity}
                      </option>
                      {citiesSelect
                        .filter(city => city !== defaultSelectedBackCity)
                        .map(differentCity => (
                          <option
                            key={`back-${differentCity}`}
                            value={String(differentCity)}
                          >
                            {differentCity}
                          </option>
                        ))}
                    </Select>
                  </div> */}
                </nav>

                <nav>
                  <div>
                    <strong>Modal</strong>
                    <Select
                      name="modal"
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
                      name="prestNome"
                      value={defaultSelectedProvider.nome}
                      onChange={e =>
                        setDefaultSelectedProvider({
                          nome: e.target.value,
                          modal: defaultSelectedProvider.modal,
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
                      name="arrival"
                      type="text"
                      defaultValue={path.arrival}
                    />
                  </div>

                  <div>
                    <strong>Desembarque</strong>
                    <Input
                      name="departure"
                      type="text"
                      defaultValue={path.departure}
                    />
                  </div>
                </nav>

                <footer>
                  <strong>O modal é:</strong>
                  <RadioInput
                    name="category"
                    options={['Linha', 'Contratado']}
                    onChangeValue={setCategoryPath}
                    defaultValue={path.linha ? 'Linha' : 'Contratado'}
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
