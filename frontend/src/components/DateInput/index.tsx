import React from 'react';
import ptLocale from 'date-fns/locale/pt';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const DateInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      <DatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateInput;
