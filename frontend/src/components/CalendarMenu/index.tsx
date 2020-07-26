import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import './styles.css';

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const WEEKDAYS_LONG = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];
const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const CalendarMenu: React.FC = () => (
  <DayPicker
    months={MONTHS}
    weekdaysLong={WEEKDAYS_LONG}
    weekdaysShort={WEEKDAYS_SHORT}
  />
);

export default CalendarMenu;
