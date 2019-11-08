import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import "react-day-picker/lib/style.css";
import "./styles.css";

import "moment/locale/pt-br";

export default class Calendar extends React.Component {
  static defaultProps = {
    numberOfMonths: 2
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    if (range.to && this.props.name === "feriado") {
      this.props.getRange(range, this.props.name);
    } else if (range.to && this.props.name === "enchente") {
      this.props.getRange(range, this.props.name);
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to, foo: new Date() };
    const modifiersStyles = {
      start: {
        color: "white",
        backgroundColor: "#292eec"
      },
      end: {
        color: "white",
        backgroundColor: "#ae53ff"
      },
      foo: {
        color: "white",
        backgroundColor: "#3dbec6",
        borderRadius: "100px"
      }
    };
    return (
      <div className="RangeExample">
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          onDayClick={this.handleDayClick}
          localeUtils={MomentLocaleUtils}
          locale={"pt-br"}
        />
      </div>
    );
  }
}
