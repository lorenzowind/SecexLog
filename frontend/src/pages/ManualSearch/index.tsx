import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

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

import logoSecex from '../../assets/logo-secex.png';
import progressBar from '../../assets/progressBar.png';
import iconGo from '../../assets/icon-go.png';
import iconBack from '../../assets/icon-back.png';
import iconCalendar from '../../assets/icon-calendar.png';

interface PathData {
  index: number;
  cityGo: string;
  cityBack: string;
  date: Date;
}

const ManualSearch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [cities, setCities] = useState<String[]>([]);
  const [pathsData, setPathsData] = useState<PathData[]>([
    {
      index: 1,
      cityGo: '',
      cityBack: '',
      date: new Date(),
    },
  ]);

  // Get cities from API to load the select component
  useEffect(() => {
    async function loadCities() {
      const response = await api.get('cities');

      setCities(response.data);
    }

    loadCities();
  }, []);

  const handleSetDate = useCallback((path: PathData, value: Date) => {
    setPathsData(state =>
      state.map(element => {
        if (element === path) {
          return {
            cityBack: path.cityBack,
            cityGo: path.cityGo,
            index: path.index,
            date: value,
          };
        }
        return element;
      }),
    );
  }, []);

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
        cityGo: '',
        cityBack: '',
        date: new Date(),
      },
    ]);
  };

  const handleSearch = useCallback(() => {
    console.log('Working...');
  }, []);

  return (
    <Container>
      <Header isAuthenticated={false} />

      <Content>
        <img src={logoSecex} alt="SecexLog" />

        <img src={progressBar} alt="ProgressBar" />

        <Form ref={formRef} onSubmit={handleSearch}>
          <InputsContainer>
            {pathsData.map(path => (
              <section key={`path-${String(path.index)}`}>
                <strong>
                  Trajeto
                  {` ${path.index}`}
                </strong>

                <Select
                  defaultValue="Selecione a cidade de ida"
                  name={`ida-${path.index}`}
                  icon={iconGo}
                >
                  <option value="Selecione a cidade de ida" disabled>
                    Selecione a cidade de ida
                  </option>
                  {cities.map((city, index) => (
                    <option key={`go-${String(index)}`} value={String(city)}>
                      {city}
                    </option>
                  ))}
                </Select>

                <Select
                  defaultValue="Selecione a cidade de volta"
                  name={`volta-${path.index}`}
                  icon={iconBack}
                >
                  <option value="Selecione a cidade de volta" disabled>
                    Selecione a cidade de volta
                  </option>
                  {cities.map((city, index) => (
                    <option key={`back-${String(index)}`} value={String(city)}>
                      {city}
                    </option>
                  ))}
                </Select>

                <CalendarInput>
                  <DateInput
                    date={path.date}
                    setDate={value => handleSetDate(path, value)}
                  />
                  <img src={iconCalendar} alt="Icon" />
                </CalendarInput>
              </section>
            ))}
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
            <Link to="automatic-search">
              <FiArrowLeft size={24} />
              Consulta Automatizada
            </Link>

            <Button type="button">Consultar</Button>
          </ButtonsContainer>
        </Form>
      </Content>
    </Container>
  );
};

export default ManualSearch;
