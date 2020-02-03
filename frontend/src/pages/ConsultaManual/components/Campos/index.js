import React from "react";
import Select from "react-select";
import DatePicker from "../DatePicker/index";

import "./styles.css";

export default class Campos extends React.Component {
  getDay = state => {};

  render() {
    const theme = theme => ({
      ...theme,

      colors: {
        ...theme.colors,
        primary25: "",
        primary: "#b0b0b0"
      }
    });

    const selectStyle = {
      control: styles => ({
        ...styles,
        border: "none",
        outline: "0"
      }),
      option: styles => ({ ...styles })
    };

    return (
      <div className="campos">
        <form>
          <div className="trajeto">
            <h1 id="trajeto">Trajeto {this.props.num}</h1>
          </div>

          <div className="cidade-saida">
            <div className="selectInitial saida dois">
              <Select
                className="basic-single"
                classNamePrefix="select"
                name="color"
                placeholder=""
                options={this.props.cidades}
                theme={theme}
                styles={selectStyle}
              />
            </div>
          </div>

          <div className="cidade-destino">
            <div className="selectInitial destino dois">
              <Select
                className="basic-single"
                classNamePrefix="select"
                name="color"
                placeholder=""
                options={this.props.cidades}
                theme={theme}
                styles={selectStyle}
              />
            </div>
          </div>

          <div className="ida">
            <div className="picker">
              <DatePicker getDay={this.getDay.bind(this)} sum={0} />
            </div>
            <div
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                display: "table-cell"
              }}
            >
              <div className="picker">
                <DatePicker getDay={this.getDay.bind(this)} sum={1}/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
