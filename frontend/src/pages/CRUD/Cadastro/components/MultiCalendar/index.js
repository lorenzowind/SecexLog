import React from "react";
import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";

import "moment/locale/pt-br";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null
    };
  }

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
  }

  render() {
    this.props.getDays(
      this.state.selectedDay
        ? this.state.selectedDay.toLocaleDateString()
        : null
    );

    const modifiers = { foo: new Date() };
    const modifiersStyles = {
      foo: {
        color: "white",
        backgroundColor: "#3dbec6",
        borderRadius: "100px"
      }
    };

    return (
      <div className="RangeExample">
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
          numberOfMonths={2}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          localeUtils={MomentLocaleUtils}
          locale={"pt-br"}
        />
      </div>
    );
  }
}
