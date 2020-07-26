import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

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
  cityBack: string;
}

const AutomaticSearch: React.FC = () => {
  const [cities, setCities] = useState<String[]>([]);
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  const [pathsData, setPathsData] = useState<PathData[]>([
    {
      index: 1,
      cityBack: '',
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

  const handleDecreasePathNumber = () => {
    if (pathsData.length > 1) {
      setPathsData(state => state.slice(0, pathsData.length - 1));
    }
  };

  const handleIncreasePathNumber = () => {
    setPathsData([
      ...pathsData,
      {
        index: 1,
        cityBack: '',
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
          <aside>
            <Select icon={iconGo}>
              <option value="0">Selecione a cidade de ida</option>
              {cities.map((city, index) => (
                <option key={index} value={index + 1}>
                  {city}
                </option>
              ))}
            </Select>

            {pathsData.map(path => (
              <Select icon={iconBack} key={path.index}>
                <option value="0">Selecione a cidade para auditoria</option>
                {cities.map((city, index) => (
                  <option key={index} value={index + 1}>
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

          <Button type="button">Consultar</Button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export default AutomaticSearch;
