import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

import {
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
} from '../../utils/dayPickerConfig';

const CalendarMenu: React.FC = () => (
  <Container>
    <DayPicker
      months={MONTHS}
      weekdaysLong={WEEKDAYS_LONG}
      weekdaysShort={WEEKDAYS_SHORT}
    />
  </Container>
);

export default CalendarMenu;
