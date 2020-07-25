import React from 'react';

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

const ManualSearch: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <img src={logoSecex} alt="SecexLog" />

        <img src={progressBar} alt="ProgressBar" />

        <InputsContainer>
          <section>
            <strong>Trajeto 1</strong>

            <Select name="cityGo" icon={iconGo}>
              <option value="0">Selecione a cidade de ida</option>
            </Select>

            <Select name="cityBack" icon={iconBack}>
              <option value="0">Selecione a cidade de volta</option>
            </Select>

            <CalendarInput>
              <DateInput />
              <img src={iconCalendar} alt="Icon" />
            </CalendarInput>
          </section>
        </InputsContainer>

        <OptionsContainer>
          <ul>
            <li>
              <b>-</b>
              Retirar cidade
            </li>
            <li>
              <b>+</b>
              Mais cidades para auditar
            </li>
          </ul>
        </OptionsContainer>

        <ButtonsContainer>
          <button type="button">Cancelar</button>

          <Button type="button">Consultar</Button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export default ManualSearch;
