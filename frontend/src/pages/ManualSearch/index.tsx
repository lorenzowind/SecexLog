import React, { useState, useEffect } from 'react';

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

import logoSecex from '../../assets/ManualSearch/logo-secex.png';
import progressBar from '../../assets/ManualSearch/progressBar-1.png';
import iconGo from '../../assets/ManualSearch/icon-go.png';
import iconBack from '../../assets/ManualSearch/icon-back.png';
import iconCalendar from '../../assets/ManualSearch/icon-calendar.png';

interface PathData {
  index: number;
  cityGo: string;
  cityBack: string;
  date: Date;
}

const ManualSearch: React.FC = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <Container>
      <Header isAuthenticated={false} />

      <Content>
        <img src={logoSecex} alt="SecexLog" />

        <img src={progressBar} alt="ProgressBar" />

        <InputsContainer>
          {pathsData.map(path => (
            <section key={path.index}>
              <strong>
                Trajeto
                {` ${path.index}`}
              </strong>

              <Select name="cityGo" icon={iconGo}>
                <option value="0">Selecione a cidade de ida</option>
                {cities.map((city, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={index} value={index + 1}>
                    {city}
                  </option>
                ))}
              </Select>

              <Select name="cityBack" icon={iconBack}>
                <option value="0">Selecione a cidade de volta</option>
                {cities.map((city, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={index} value={index + 1}>
                    {city}
                  </option>
                ))}
              </Select>

              <CalendarInput>
                <DateInput />
                <img src={iconCalendar} alt="Icon" />
              </CalendarInput>
            </section>
          ))}
        </InputsContainer>

        <OptionsContainer>
          <ul>
            <li>
              <button type="button" onClick={handleDecreasePathNumber}>
                <b>-</b>
                Retirar cidade
              </button>
            </li>
            <li>
              <button type="button" onClick={handleIncreasePathNumber}>
                <b>+</b>
                Mais cidades para auditar
              </button>
            </li>
          </ul>
        </OptionsContainer>

        <ButtonsContainer>
          <button type="button">Consulta Automatizada</button>

          <Button type="button">Consultar</Button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export default ManualSearch;
