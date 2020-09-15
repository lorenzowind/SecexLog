import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useCity } from '../../hooks/modules/city';
import { useToast } from '../../hooks/toast';
import { useSearchResult, ManualSearchData } from '../../hooks/searchResult';

import {
  Container,
  Content,
  InputsContainer,
  CalendarInput,
  OptionsContainer,
  ButtonsContainer,
} from './styles';

import {
  Header,
  Select,
  Button,
  DateInput,
  LoadingPartial,
  LoadingPage,
} from '../../components';

import logoSecex from '../../assets/logo-secex.png';
import progressBar from '../../assets/progressBar.png';
import iconGo from '../../assets/icon-go.png';
import iconBack from '../../assets/icon-back.png';
import iconCalendar from '../../assets/icon-calendar.png';

const ManualSearch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [pathsDate, setPathsDate] = useState<Date[]>([new Date()]);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { cities, getCities } = useCity();
  const { addToast } = useToast();
  const { getManualSearchResult } = useSearchResult();

  const handleGetCities = useCallback(async () => {
    setLoadingPartial(true);

    await getCities(false).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetCities();
      setIsLoaded(true);
    }
  }, [handleGetCities, isLoaded]);

  const handleSetDate = useCallback((index, value: Date) => {
    setPathsDate(state =>
      state.map((date, curIndex) => {
        if (curIndex === index) {
          return value;
        }
        return date;
      }),
    );
  }, []);

  const handleDecreasePathNumber = () => {
    if (pathsDate.length > 1) {
      setPathsDate(state => state.slice(0, pathsDate.length - 1));
    }
  };

  const handleIncreasePathNumber = () => {
    setPathsDate([...pathsDate, new Date()]);
  };

  const handleSearch = useCallback(
    async (data: Object) => {
      try {
        const manualSearchData: ManualSearchData = {
          paths: [],
        };

        Object.entries(data).forEach((entry, index) => {
          const value = entry[1];

          if (!index) {
            manualSearchData.paths.push({
              goCity: value,
              backCity: '',
              date: pathsDate[index],
            });
          } else {
            const currentLength = manualSearchData.paths.length;

            index % 2 === 0
              ? manualSearchData.paths.push({
                  goCity: value,
                  backCity: '',
                  date: pathsDate[currentLength],
                })
              : (manualSearchData.paths[currentLength - 1] = {
                  goCity: manualSearchData.paths[currentLength - 1].goCity,
                  backCity: value,
                  date: manualSearchData.paths[currentLength - 1].date,
                });
          }

          if (
            value === 'Selecione a cidade de ida' ||
            value === 'Selecione a cidade de volta'
          ) {
            throw new Error();
          }
        });

        // setLoadingPage(true);

        // await getManualSearchResult(manualSearchData).then(() => {
        //   setLoadingPage(false);
        // });

        getManualSearchResult(manualSearchData);

        history.push('/result-search');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Selecione todos os campos',
        });
      }
    },
    [addToast, getManualSearchResult, history, pathsDate],
  );

  return (
    <>
      {loadingPage && <LoadingPage />}

      {loadingPartial && <LoadingPartial zIndex={1} />}

      <Container>
        <Header isAuthenticated={false} />

        <Content>
          <img src={logoSecex} alt="SecexLog" />

          <img src={progressBar} alt="ProgressBar" />

          <Form ref={formRef} onSubmit={handleSearch}>
            <InputsContainer>
              {pathsDate.map((path, index) => (
                <section key={`path-${String(index)}`}>
                  <strong>
                    Trajeto
                    {` ${index + 1}`}
                  </strong>

                  <Select
                    defaultValue="Selecione a cidade de ida"
                    name={`ida-${index}`}
                    icon={iconGo}
                  >
                    <option value="Selecione a cidade de ida" disabled>
                      Selecione a cidade de ida
                    </option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Select>

                  <Select
                    defaultValue="Selecione a cidade de volta"
                    name={`volta-${index}`}
                    icon={iconBack}
                  >
                    <option value="Selecione a cidade de volta" disabled>
                      Selecione a cidade de volta
                    </option>

                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Select>

                  <CalendarInput>
                    <DateInput
                      date={path}
                      setDate={value => handleSetDate(index, value)}
                    />
                    <img src={iconCalendar} alt="Icon" />
                  </CalendarInput>
                </section>
              ))}
            </InputsContainer>

            <OptionsContainer>
              <ul>
                {pathsDate.length > 1 && (
                  <li>
                    <button type="button" onClick={handleDecreasePathNumber}>
                      <b>-</b>
                      Retirar cidade
                    </button>
                  </li>
                )}
                <li>
                  <button type="button" onClick={handleIncreasePathNumber}>
                    <b>+</b>
                    Mais cidades para auditar
                  </button>
                </li>
              </ul>
            </OptionsContainer>

            <ButtonsContainer>
              <Link to="automatic-search">
                <FiArrowLeft size={24} />
                Consulta Automatizada
              </Link>

              <Button type="submit">Consultar</Button>
            </ButtonsContainer>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default ManualSearch;
