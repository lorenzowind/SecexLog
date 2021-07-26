import React, { useCallback } from 'react';
import DayPicker, { DateUtils, Modifiers, RangeModifier } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container, Content } from './styles';

import {
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
} from '../../utils/dayPickerConfig';

export type RangeState = RangeModifier;

interface Props {
  rangeDays: RangeState;
  setRangeDays: React.Dispatch<React.SetStateAction<RangeState>>;
}

const DateRangeInput: React.FC<Props> = ({ rangeDays, setRangeDays }) => {
  const modifiers: Modifiers = {
    today: undefined,
    outside: undefined,
    state: rangeDays.from || undefined,
    end: rangeDays.to || undefined,
  };
  const numberMonths = 2;

  const handleDayClick = useCallback(
    day => {
      const range = DateUtils.addDayToRange(day, rangeDays);
      setRangeDays(range);
    },
    [rangeDays, setRangeDays],
  );

  return (
    <Container>
      <Content>
        <DayPicker
          className="Selectable"
          numberOfMonths={numberMonths}
          selectedDays={[
            rangeDays.from || undefined,
            { from: rangeDays.from, to: rangeDays.to },
          ]}
          modifiers={modifiers}
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
