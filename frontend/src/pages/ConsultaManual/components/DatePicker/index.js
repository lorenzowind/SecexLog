import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function MaterialUIPickers() {
  var now = new Date();
<<<<<<< HEAD
  let date =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate() + 1);
=======
  let date = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + ((now.getDate()));
>>>>>>> c81dda3575af1824b8ac5ecd7c38dc322cf3e5d8
  const [selectedDate, setSelectedDate] = React.useState(new Date(date));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
