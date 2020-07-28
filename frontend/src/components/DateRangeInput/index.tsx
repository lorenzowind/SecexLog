import React, { useCallback } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container, Content } from './styles';

import {
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
} from '../../utils/dayPickerConfig';

interface Props {
  selectedDays: Date[];
  setSelectDays: React.Dispatch<React.SetStateAction<Date[]>>;
}

const DateRangeInput: React.FC<Props> = ({ selectedDays, setSelectDays }) => {
  const handleDayClick = useCallback(
    (day, { selected }) => {
      if (selected) {
        const selectedIndex = selectedDays.findIndex(selectedDay =>
          DateUtils.isSameDay(selectedDay, day),
        );
        setSelectDays(state =>
          state.filter((_day, index) => index !== selectedIndex),
        );
      } else {
        setSelectDays([...selectedDays, day]);
      }
    },
    [selectedDays, setSelectDays],
  );

  return (
    <Container>
      <Content>
        <DayPicker
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
        />
      </Content>
    </Container>
  );
};

export default DateRangeInput;
