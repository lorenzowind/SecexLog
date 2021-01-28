import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useCity } from '../../hooks/modules/city';
import { useToast } from '../../hooks/toast';
import { AutomaticSearchData } from '../../hooks/searchResult';

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
  NotReadyPopup,
} from '../../components';

import logoSecex from '../../assets/logo-secex.png';
import progressBar from '../../assets/progressBar.png';
import iconGo from '../../assets/icon-go.png';
import iconBack from '../../assets/icon-back.png';
import iconCalendar from '../../assets/icon-calendar.png';

const AutomaticSearch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // const history = useHistory();

  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  const [pathsControl, setPathsControl] = useState([1]);

  const [notReadyPopupActive, setNotReadyPopupActive] = useState(false);
  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage /* , setLoadingPage */] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { cities, getCities } = useCity();
  const { addToast } = useToast();
  // const { getAutomaticSearchResult } = useSearchResult();

  const handleGetCities = useCallback(async () => {
    setLoadingPartial(true);

    await getCities('').then(() => {
      setLoadingPartial(false);
    });
  }, [getCities]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetCities();
      setIsLoaded(true);
    }
  }, [handleGetCities, isLoaded]);

  const handleDecreasePathNumber = () => {
    if (pathsControl.length > 1) {
      setPathsControl(state => state.slice(0, pathsControl.length - 1));
    }
  };

  const handleIncreasePathNumber = () => {
    setPathsControl([...pathsControl, pathsControl.length + 1]);
  };

  const handleSearch = useCallback(
    async (data: Object) => {
      try {
        const automaticSearchData: AutomaticSearchData = {
          initialDate,
          finalDate,
          initialCity: '',
          auditatedCities: [],
        };

        Object.entries(data).forEach((entry, index) => {
          const value = entry[1];

          !index
            ? (automaticSearchData.initialCity = value)
            : automaticSearchData.auditatedCities.push(value);

          if (
            value === 'Selecione a cidade de ida' ||
            value === 'Selecione a cidade para auditoria'
          ) {
            throw new Error();
          }
        });

        // setLoadingPage(true);

        // await getAutomaticSearchResult(automaticSearchData).then(() => {
        //   setLoadingPage(false);
        // });

        // history.push('/result-search');

        setNotReadyPopupActive(true);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Selecione todos os campos',
        });
      }
    },
    [addToast, finalDate, initialDate],
  );

  return (
    <>
      {loadingPage && <LoadingPage />}

      {loadingPartial && <LoadingPartial zIndex={1} />}

      {notReadyPopupActive && (
        <NotReadyPopup setNotReadyPopupActive={setNotReadyPopupActive} />
      )}

      <Container>
        <Header isAuthenticated={false} />

        <Content>
          <img src={logoSecex} alt="SecexLog" />

          <img src={progressBar} alt="ProgressBar" />

          <Form ref={formRef} onSubmit={handleSearch}>
            <InputsContainer>
              <aside>
                <Select
                  defaultValue="Selecione a cidade de ida"
                  icon={iconGo}
                  name="ida"
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

                {pathsControl.map(path => (
                  <Select
                    defaultValue="Selecione a cidade para auditoria"
                    icon={iconBack}
                    key={`path-${String(path)}`}
                    name={`auditada-${path}`}
                  >
                    <option value="Selecione a cidade para auditoria" disabled>
                      Selecione a cidade para auditoria
                    </option>

                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                ))}
              </aside>

              <section>
                <CalendarInput>
                  <DateInput date={initialDate} setDate={setInitialDate} />
                  <img src={iconCalendar} alt="Icon" />
                </CalendarInput>

                <CalendarInput>
                  <DateInput date={finalDate} setDate={setFinalDate} />
                  <img src={iconCalendar} alt="Icon" />
                </CalendarInput>
              </section>
            </InputsContainer>

            <OptionsContainer>
              <ul>
                {pathsControl.length > 1 && (
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
              <Button type="submit">Consultar</Button>

              <Link to="/">
                Consulta Manual
                <FiArrowRight size={24} />
              </Link>
            </ButtonsContainer>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default AutomaticSearch;
