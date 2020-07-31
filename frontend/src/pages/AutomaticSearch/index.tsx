import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useCity } from '../../hooks/modules/city';

import {
  Container,
  Content,
  InputsContainer,
  CalendarInput,
  OptionsContainer,
  ButtonsContainer,
} from './styles';

import Header from '../../components/Header';
import Select from '../../components/Select';
import Button from '../../components/Button';
import DateInput from '../../components/DateInput';
import LoadingPartial from '../../components/Loading/LoadingPartial';

import logoSecex from '../../assets/logo-secex.png';
import progressBar from '../../assets/progressBar.png';
import iconGo from '../../assets/icon-go.png';
import iconBack from '../../assets/icon-back.png';
import iconCalendar from '../../assets/icon-calendar.png';

interface PathData {
  index: number;
  cityBack: string;
}

const AutomaticSearch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [citiesSelect, setCitiesSelect] = useState<String[]>([]);
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  const [pathsData, setPathsData] = useState<PathData[]>([
    {
      index: 1,
      cityBack: '',
    },
  ]);
  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleDecreasePathNumber = () => {
    if (pathsData.length > 1) {
      setPathsData(state => state.slice(0, pathsData.length - 1));
    }
  };

  const handleIncreasePathNumber = () => {
    setPathsData([
      ...pathsData,
      {
        index: pathsData.length + 1,
        cityBack: '',
      },
    ]);
  };

  const handleSearch = useCallback(() => {
    console.log('Working...');
  }, []);

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={1} />}

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
                  {citiesSelect.map((city, index) => (
                    <option key={`go-${String(index)}`} value={String(city)}>
                      {city}
                    </option>
                  ))}
                </Select>

                {pathsData.map(path => (
                  <Select
                    defaultValue="Selecione a cidade para auditoria"
                    icon={iconBack}
                    key={`path-${String(path.index)}`}
                    name={`volta-${path.index}`}
                  >
                    <option value="Selecione a cidade para auditoria" disabled>
                      Selecione a cidade para auditoria
                    </option>
                    {citiesSelect.map((city, index) => (
                      <option
                        key={`back-${String(index)}`}
                        value={String(city)}
                      >
                        {city}
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
                {pathsData.length > 1 && (
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
              <Link to="/">
                <FiArrowLeft size={24} />
                Consulta Manual
              </Link>

              <Button type="submit">Consultar</Button>
            </ButtonsContainer>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default AutomaticSearch;
